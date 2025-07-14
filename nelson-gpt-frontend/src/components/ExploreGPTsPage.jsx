import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Pill, Weight, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const ExploreGPTsPage = () => {
  const [formData, setFormData] = useState({
    weight: '',
    age: '',
    ageUnit: 'years',
    drug: '',
    indication: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const commonDrugs = [
    'Acetaminophen (Paracetamol)',
    'Ibuprofen',
    'Amoxicillin',
    'Azithromycin',
    'Prednisolone',
    'Albuterol',
    'Ceftriaxone',
    'Vancomycin'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDosage = () => {
    setLoading(true);
    
    // Simulate calculation
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const drug = formData.drug;
      
      let dosage = '';
      let frequency = '';
      let route = 'Oral';
      let warnings = [];
      
      // Simple dosage calculations (in real app, this would be more comprehensive)
      switch (drug) {
        case 'Acetaminophen (Paracetamol)':
          dosage = `${(weight * 10).toFixed(1)}-${(weight * 15).toFixed(1)} mg`;
          frequency = 'Every 4-6 hours (max 5 doses/24h)';
          if (weight < 3) warnings.push('Use with caution in neonates');
          break;
        case 'Ibuprofen':
          dosage = `${(weight * 5).toFixed(1)}-${(weight * 10).toFixed(1)} mg`;
          frequency = 'Every 6-8 hours';
          warnings.push('Not recommended under 6 months');
          if (weight < 6) warnings.push('Contraindicated in infants <6 months');
          break;
        case 'Amoxicillin':
          dosage = `${(weight * 20).toFixed(1)}-${(weight * 40).toFixed(1)} mg`;
          frequency = 'Every 8 hours';
          route = 'Oral';
          break;
        default:
          dosage = 'Please consult drug reference';
          frequency = 'As per guidelines';
      }
      
      setResult({
        dosage,
        frequency,
        route,
        warnings,
        maxDaily: drug === 'Acetaminophen (Paracetamol)' ? `${(weight * 75).toFixed(1)} mg` : 'See guidelines'
      });
      setLoading(false);
    }, 1500);
  };

  const isFormValid = formData.weight && formData.age && formData.drug;

  return (
    <div className="h-full bg-[#121212] p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Explore GPTs</h1>
          <p className="text-[#B0B0B0]">Specialized tools for pediatric healthcare</p>
        </motion.div>

        {/* Drug Dosing Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Drug Dosing Calculator</h2>
              <p className="text-[#B0B0B0]">Calculate pediatric medication dosages</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  <Weight size={16} className="inline mr-2" />
                  Patient Weight
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="flex-1 bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none"
                  />
                  <select className="bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none">
                    <option>kg</option>
                    <option>lbs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Patient Age
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="flex-1 bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none"
                  />
                  <select 
                    value={formData.ageUnit}
                    onChange={(e) => handleInputChange('ageUnit', e.target.value)}
                    className="bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  <Pill size={16} className="inline mr-2" />
                  Medication
                </label>
                <select
                  value={formData.drug}
                  onChange={(e) => handleInputChange('drug', e.target.value)}
                  className="w-full bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none"
                >
                  <option value="">Select medication</option>
                  {commonDrugs.map((drug) => (
                    <option key={drug} value={drug}>{drug}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Indication
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fever, Pain, Infection"
                  value={formData.indication}
                  onChange={(e) => handleInputChange('indication', e.target.value)}
                  className="w-full bg-[#121212] text-white border border-[#262626] rounded-lg px-3 py-2 focus:border-[#333333] outline-none"
                />
              </div>

              <button
                onClick={calculateDosage}
                disabled={!isFormValid || loading}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isFormValid && !loading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-[#262626] text-[#B0B0B0] cursor-not-allowed'
                }`}
              >
                {loading ? 'Calculating...' : 'Calculate Dosage'}
              </button>
            </div>

            {/* Results */}
            <div>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#121212] rounded-lg border border-[#262626] p-6"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle size={20} className="text-green-500" />
                    <h3 className="text-white font-semibold">Dosage Calculation</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[#B0B0B0] text-sm">Recommended Dose</label>
                      <div className="text-white font-semibold text-lg">{result.dosage}</div>
                    </div>

                    <div>
                      <label className="text-[#B0B0B0] text-sm">Frequency</label>
                      <div className="text-white">{result.frequency}</div>
                    </div>

                    <div>
                      <label className="text-[#B0B0B0] text-sm">Route</label>
                      <div className="text-white">{result.route}</div>
                    </div>

                    <div>
                      <label className="text-[#B0B0B0] text-sm">Maximum Daily Dose</label>
                      <div className="text-white">{result.maxDaily}</div>
                    </div>

                    {result.warnings.length > 0 && (
                      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle size={16} className="text-yellow-500" />
                          <span className="text-yellow-500 font-medium">Warnings</span>
                        </div>
                        <ul className="text-yellow-200 text-sm space-y-1">
                          {result.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
                      <p className="text-blue-200 text-sm">
                        <strong>Disclaimer:</strong> This calculator provides general guidance only. 
                        Always verify dosages with current prescribing information and consider 
                        patient-specific factors.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-[#121212] rounded-lg border border-[#262626] p-6 text-center">
                  <Calculator size={48} className="text-[#B0B0B0] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Ready to Calculate</h3>
                  <p className="text-[#B0B0B0]">
                    Fill in the patient information to get dosage recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          {[
            {
              title: 'Growth Chart Calculator',
              description: 'Plot and analyze pediatric growth percentiles',
              icon: '📊',
              status: 'Coming Soon'
            },
            {
              title: 'Vaccine Schedule Tracker',
              description: 'Track immunization schedules by age',
              icon: '💉',
              status: 'Coming Soon'
            }
          ].map((tool, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-6 opacity-60"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
              <p className="text-[#B0B0B0] mb-4">{tool.description}</p>
              <span className="inline-block bg-[#262626] text-[#B0B0B0] px-3 py-1 rounded-full text-sm">
                {tool.status}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreGPTsPage;

