import { create } from 'zustand';

export const useContactFormStore = create((set) => ({
  formData: {
    name: '',
    email: '',
    message: ''
  },
  
  isDirty: false,
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  lastSaved: null,
  
  updateField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value },
    isDirty: true,
    lastSaved: null
  })),
  
  saveForm: () => {
    const now = new Date();
    set((state) => ({ lastSaved: now }));
  },
  
  submitForm: async () => {
    set({ isSubmitting: true, submitError: null });
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success
      set({ 
        isSubmitting: false, 
        submitSuccess: true,
        isDirty: false
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        set({
          submitSuccess: false,
          formData: { name: '', email: '', message: '' }
        });
      }, 5000);
      
    } catch (error) {
      set({ 
        isSubmitting: false, 
        submitError: 'There was an error submitting your message. Please try again.'
      });
    }
  },
  
  resetForm: () => set({
    formData: { name: '', email: '', message: '' },
    isDirty: false,
    submitSuccess: false,
    submitError: null,
    lastSaved: null
  })
}));