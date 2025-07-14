import os
import json
import openai
from flask import Blueprint, request, jsonify
from datetime import datetime

rag_bp = Blueprint('rag', __name__)

# Initialize OpenAI client for embeddings
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_base = os.getenv('OPENAI_API_BASE')

# Sample Nelson Textbook content for demonstration
SAMPLE_TEXTBOOK_CONTENT = [
    {
        "id": "1",
        "chapter": "Neonatal Jaundice",
        "page_number": 102,
        "content": """Neonatal jaundice is a common condition affecting approximately 60% of term newborns and 80% of preterm infants. 
        It results from elevated bilirubin levels in the blood. Physiologic jaundice typically appears after 24 hours of life, 
        peaks at 3-5 days, and resolves by 1-2 weeks in term infants. Pathologic jaundice appears within the first 24 hours, 
        has a rapid rise in bilirubin levels, or persists beyond normal timeframes. Treatment includes phototherapy for moderate 
        hyperbilirubinemia and exchange transfusion for severe cases. Risk factors include prematurity, breastfeeding difficulties, 
        ABO incompatibility, and glucose-6-phosphate dehydrogenase deficiency."""
    },
    {
        "id": "2", 
        "chapter": "Pediatric Fever Management",
        "page_number": 156,
        "content": """Fever in children is defined as a rectal temperature ≥38°C (100.4°F). It is a common presenting symptom 
        in pediatric practice and represents the body's natural response to infection or inflammation. Management depends on 
        the child's age, appearance, and underlying conditions. In infants <3 months, fever requires immediate medical evaluation 
        due to risk of serious bacterial infection. Antipyretic therapy with acetaminophen or ibuprofen can be used for comfort 
        but is not mandatory unless the child appears distressed. The focus should be on identifying and treating the underlying 
        cause rather than the fever itself."""
    },
    {
        "id": "3",
        "chapter": "Pediatric Growth and Development",
        "page_number": 45,
        "content": """Normal growth and development in children follows predictable patterns but with individual variation. 
        Growth charts are essential tools for monitoring progress. Key milestones include: motor development (sitting at 6 months, 
        walking at 12-15 months), language development (first words at 12 months, 2-word phrases at 24 months), and social 
        development (social smile at 2 months, stranger anxiety at 8-9 months). Red flags for developmental delay include 
        loss of previously acquired skills, significant delays in multiple domains, or parental concerns. Early intervention 
        services can significantly improve outcomes for children with developmental delays."""
    },
    {
        "id": "4",
        "chapter": "Pediatric Respiratory Infections",
        "page_number": 234,
        "content": """Respiratory tract infections are among the most common illnesses in children. Upper respiratory infections 
        (URIs) including the common cold are typically viral and self-limiting. Lower respiratory tract infections such as 
        pneumonia and bronchiolitis require more careful evaluation. Bronchiolitis, commonly caused by RSV, affects infants 
        and young children, presenting with wheezing, cough, and respiratory distress. Treatment is supportive with oxygen 
        and hydration as needed. Pneumonia may be viral or bacterial; bacterial pneumonia often requires antibiotic therapy. 
        Warning signs include high fever, significant respiratory distress, poor feeding, and lethargy."""
    },
    {
        "id": "5",
        "chapter": "Pediatric Nutrition and Feeding",
        "page_number": 78,
        "content": """Proper nutrition is crucial for optimal growth and development in children. Breastfeeding is recommended 
        as the exclusive source of nutrition for the first 6 months of life. Introduction of solid foods should begin around 
        6 months with iron-rich foods. Common feeding problems include food allergies, failure to thrive, and feeding aversion. 
        Nutritional requirements vary by age, with infants requiring higher caloric density per kilogram than older children. 
        Vitamin D supplementation is recommended for breastfed infants. Iron deficiency anemia is common in toddlers and 
        can be prevented with iron-rich foods and appropriate screening."""
    }
]

def get_embedding(text):
    """Get embedding for text using OpenAI API"""
    try:
        client = openai.OpenAI()
        response = client.embeddings.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Error getting embedding: {e}")
        return None

def cosine_similarity(a, b):
    """Calculate cosine similarity between two vectors"""
    import math
    dot_product = sum(x * y for x, y in zip(a, b))
    magnitude_a = math.sqrt(sum(x * x for x in a))
    magnitude_b = math.sqrt(sum(x * x for x in b))
    if magnitude_a == 0 or magnitude_b == 0:
        return 0
    return dot_product / (magnitude_a * magnitude_b)

@rag_bp.route('/rag/search', methods=['POST'])
def search_content():
    try:
        data = request.get_json()
        query = data.get('query', '')
        
        if not query:
            return jsonify({"error": "Query is required"}), 400
        
        # Get embedding for the query
        query_embedding = get_embedding(query)
        if not query_embedding:
            return jsonify({"error": "Failed to generate query embedding"}), 500
        
        # For demonstration, we'll use simple text matching
        # In production, this would use vector similarity search with stored embeddings
        results = []
        for content in SAMPLE_TEXTBOOK_CONTENT:
            # Simple keyword matching for demo
            if any(word.lower() in content['content'].lower() for word in query.lower().split()):
                results.append({
                    "id": content['id'],
                    "chapter": content['chapter'],
                    "page_number": content['page_number'],
                    "content": content['content'][:500] + "..." if len(content['content']) > 500 else content['content'],
                    "relevance_score": 0.8  # Mock score
                })
        
        # Sort by relevance (mock sorting for demo)
        results.sort(key=lambda x: x['relevance_score'], reverse=True)
        
        return jsonify({
            "results": results[:5],  # Return top 5 results
            "total_found": len(results)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rag_bp.route('/rag/content/<content_id>')
def get_content(content_id):
    try:
        # Find content by ID
        content = next((item for item in SAMPLE_TEXTBOOK_CONTENT if item['id'] == content_id), None)
        
        if not content:
            return jsonify({"error": "Content not found"}), 404
        
        return jsonify(content)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rag_bp.route('/rag/chapters')
def get_chapters():
    try:
        # Get unique chapters
        chapters = list(set(item['chapter'] for item in SAMPLE_TEXTBOOK_CONTENT))
        chapters.sort()
        
        return jsonify({
            "chapters": chapters,
            "total_content_pieces": len(SAMPLE_TEXTBOOK_CONTENT)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@rag_bp.route('/rag/enhanced-chat', methods=['POST'])
def enhanced_chat():
    """Chat endpoint with RAG enhancement"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        # Search for relevant content
        relevant_content = []
        for content in SAMPLE_TEXTBOOK_CONTENT:
            if any(word.lower() in content['content'].lower() for word in message.lower().split()):
                relevant_content.append(content)
        
        # Prepare enhanced prompt with context
        context = ""
        if relevant_content:
            context = "Relevant information from Nelson Textbook of Pediatrics:\n\n"
            for content in relevant_content[:3]:  # Use top 3 relevant pieces
                context += f"Chapter: {content['chapter']}\n"
                context += f"Content: {content['content']}\n\n"
        
        enhanced_message = f"{context}\nUser Question: {message}\n\nPlease provide a comprehensive answer based on the above context and your knowledge of pediatric medicine."
        
        return jsonify({
            "enhanced_message": enhanced_message,
            "context_used": len(relevant_content),
            "relevant_chapters": [content['chapter'] for content in relevant_content[:3]]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

