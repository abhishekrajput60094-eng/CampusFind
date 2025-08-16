import React, { useState } from 'react';
import { Upload, MapPin, Calendar, Tag, User, ChevronRight, ChevronLeft, Check, Camera, X } from 'lucide-react';

interface ReportFormProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  type: 'lost' | 'found' | '';
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  contactInfo: string;
  images: File[];
}

const ReportForm: React.FC<ReportFormProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    type: '',
    title: '',
    category: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
    images: []
  });

  const totalSteps = 4;

  const categories = [
    { id: 'electronics', label: 'Electronics', emoji: '📱' },
    { id: 'bag', label: 'Bags & Backpacks', emoji: '🎒' },
    { id: 'clothing', label: 'Clothing', emoji: '👕' },
    { id: 'documents', label: 'Documents', emoji: '📄' },
    { id: 'jewelry', label: 'Jewelry', emoji: '💍' },
    { id: 'books', label: 'Books & Stationery', emoji: '📚' },
    { id: 'sports', label: 'Sports Equipment', emoji: '⚽' },
    { id: 'other', label: 'Other', emoji: '🔍' }
  ];

  const locations = [
    'Library - Main Floor',
    'Library - 2nd Floor',
    'Library - 3rd Floor',
    'Student Center',
    'Cafeteria',
    'Gym/Sports Complex',
    'Engineering Building',
    'Science Building',
    'Arts Building',
    'Dormitory',
    'Parking Lot',
    'Other'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    // Show success message and redirect
    alert('Item reported successfully!');
    onNavigate('dashboard');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== '';
      case 2:
        return formData.title.trim() !== '' && formData.category !== '';
      case 3:
        return formData.description.trim() !== '' && formData.location !== '';
      case 4:
        return formData.contactInfo.trim() !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                What type of report?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select whether you've lost an item or found one
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 text-left ${
                  formData.type === 'lost'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                }`}
              >
                <div className="text-6xl mb-4">😢</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  I Lost Something
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Report an item you've lost and get help finding it
                </p>
              </button>

              <button
                onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
                className={`p-8 rounded-3xl border-2 transition-all duration-300 text-left ${
                  formData.type === 'found'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                }`}
              >
                <div className="text-6xl mb-4">😊</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  I Found Something
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Report an item you've found to help someone else
                </p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Item Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about the item
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Blue iPhone 14 Pro"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        formData.category === category.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{category.emoji}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {category.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Location & Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Help others identify and locate the item
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the item in detail (color, brand, unique features, condition)..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photos (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 5 && (
                    <label className="cursor-pointer">
                      <div className="w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-purple-500 transition-colors duration-300">
                        <Camera className="h-6 w-6 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Upload up to 5 photos to help identify the item
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                How should we contact you about this item?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                  placeholder="your.email@university.edu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
                />
              </div>

              {/* Summary */}
              <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Summary</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div><strong>Type:</strong> {formData.type === 'lost' ? 'Lost Item' : 'Found Item'}</div>
                  <div><strong>Item:</strong> {formData.title}</div>
                  <div><strong>Category:</strong> {categories.find(c => c.id === formData.category)?.label}</div>
                  <div><strong>Location:</strong> {formData.location}</div>
                  <div><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</div>
                  <div><strong>Photos:</strong> {formData.images.length} uploaded</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    index + 1 < currentStep 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                      : index + 1 === currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {index + 1 < currentStep ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className={`text-sm mt-2 font-medium ${
                    index + 1 <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}>
                    Step {index + 1}
                  </div>
                </div>
                {index < totalSteps - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${
                    index + 1 < currentStep 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
              currentStep === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                canProceed()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${
                canProceed()
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check className="h-5 w-5 mr-2" />
              Submit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportForm;