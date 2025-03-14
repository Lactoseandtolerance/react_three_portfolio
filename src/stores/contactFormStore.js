// src/stores/contactFormStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Create the store with persistence middleware
export const useContactFormStore = create(
  persist(
    (set, get) => ({
      // Form fields
      formData: {
        name: '',
        email: '',
        message: ''
      },
      
      // Form state
      isDirty: false,
      isSubmitting: false,
      submitSuccess: false,
      submitError: null,
      lastSaved: null,
      
      // Actions
      updateField: (field, value) => set((state) => ({
        formData: { ...state.formData, [field]: value },
        isDirty: true,
        lastSaved: new Date().toISOString() // Update the last saved timestamp
      })),
      
      saveForm: () => {
        const now = new Date().toISOString();
        set({ lastSaved: now });
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
              formData: { name: '', email: '', message: '' },
              isDirty: false,
              lastSaved: null
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
    }),
    {
      name: 'contact-form-storage', // Name for the localStorage key
      storage: createJSONStorage(() => localStorage),
      // Optionally select which parts of the state to persist
      partialize: (state) => ({
        formData: state.formData,
        isDirty: state.isDirty,
        lastSaved: state.lastSaved
      }),
    }
  )
);