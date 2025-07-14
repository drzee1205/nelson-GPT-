import os
import json
from flask import Blueprint, request, jsonify, Response
from mistralai import Mistral
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

# Initialize Mistral client
mistral_client = Mistral(api_key=os.getenv('MISTRAL_API_KEY'))

@chat_bp.route('/chat/stream', methods=['POST'])
def stream_chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        chat_history = data.get('history', [])
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        # Prepare messages for Mistral API
        messages = []
        
        # Add system prompt for pediatric context
        system_prompt = """You are Nelson-GPT, an AI assistant specialized in pediatric medicine based on the Nelson Textbook of Pediatrics. 
        You provide evidence-based medical information for healthcare professionals and medical students. 
        Always emphasize that your responses are for educational purposes and should not replace clinical judgment or direct patient care.
        Format your responses in clear, professional markdown."""
        
        messages.append({"role": "system", "content": system_prompt})
        
        # Add chat history
        for msg in chat_history[-10:]:  # Keep last 10 messages for context
            messages.append({
                "role": msg.get('role', 'user'),
                "content": msg.get('content', '')
            })
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        def generate():
            try:
                # Stream response from Mistral
                stream = mistral_client.chat.stream(
                    model="mistral-large-latest",
                    messages=messages,
                    temperature=0.3,
                    max_tokens=2000
                )
                
                for chunk in stream:
                    if chunk.data.choices[0].delta.content:
                        content = chunk.data.choices[0].delta.content
                        yield f"data: {json.dumps({'content': content})}\n\n"
                
                yield f"data: {json.dumps({'done': True})}\n\n"
                
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        return Response(generate(), mimetype='text/plain')
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route('/chat/complete', methods=['POST'])
def complete_chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        chat_history = data.get('history', [])
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        # Prepare messages for Mistral API
        messages = []
        
        # Add system prompt
        system_prompt = """You are Nelson-GPT, an AI assistant specialized in pediatric medicine based on the Nelson Textbook of Pediatrics. 
        You provide evidence-based medical information for healthcare professionals and medical students. 
        Always emphasize that your responses are for educational purposes and should not replace clinical judgment or direct patient care.
        Format your responses in clear, professional markdown."""
        
        messages.append({"role": "system", "content": system_prompt})
        
        # Add chat history
        for msg in chat_history[-10:]:
            messages.append({
                "role": msg.get('role', 'user'),
                "content": msg.get('content', '')
            })
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        # Get response from Mistral
        response = mistral_client.chat.complete(
            model="mistral-large-latest",
            messages=messages,
            temperature=0.3,
            max_tokens=2000
        )
        
        assistant_message = response.choices[0].message.content
        
        return jsonify({
            "response": assistant_message,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route('/chat/save', methods=['POST'])
def save_chat():
    try:
        data = request.get_json()
        chat_data = data.get('chat', {})
        
        # For now, just return success - in production this would save to Supabase
        return jsonify({
            "success": True,
            "message": "Chat saved successfully",
            "chat_id": "temp_id_" + str(datetime.now().timestamp())
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

