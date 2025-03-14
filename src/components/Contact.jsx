import React, { useState, useEffect } from 'react';
import { useContactFormStore } from '../stores/contactFormStore';
import styled from 'styled-components';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0c0c0c;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  background: rgba(27, 27, 27, 0.8);
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  max-height: 80vh; /* Fixed height */
  overflow-y: auto; /* Enable scrolling */
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactInfo = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #d4d4d4;
  
  a {
    color: #d4af37;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #d4d4d4;
`;

const Input = styled.input`
  padding: 1rem;
  background: rgba(61, 61, 61, 0.8);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #f0f0f0;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #d4af37;
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  background: rgba(61, 61, 61, 0.8);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #f0f0f0;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #d4af37;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #d4af37;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a98c37;
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: #7d6b2e;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  color: #d4d4d4;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
`;

const SavedMessage = styled.div`
  background: rgba(128, 128, 128, 0.2);
  color: #d4d4d4;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuccessMessage = styled.div`
  background: rgba(40, 167, 69, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(220, 53, 69, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const StorageInfo = styled.div`
  background: rgba(13, 110, 253, 0.1);
  border: 1px solid rgba(13, 110, 253, 0.2);
  color: #a0c0ff;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  strong {
    color: #d4af37;
  }
`;

const Contact = () => {
  const { 
    formData, 
    updateField, 
    submitForm, 
    resetForm, 
    isDirty,
    isSubmitting,
    submitSuccess,
    submitError,
    lastSaved,
    saveForm
  } = useContactFormStore();
  
  // Format the lastSaved date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formattedLastSaved = lastSaved ? formatDate(lastSaved) : null;
  
  // Auto-save every 30 seconds if form is dirty
  useEffect(() => {
    let interval;
    if (isDirty) {
      interval = setInterval(() => {
        saveForm();
      }, 30000);
    }
    
    return () => clearInterval(interval);
  }, [isDirty, saveForm]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>Contact Me</SectionTitle>
        
        <ContactInfo>
          I'd love to hear from you! Fill out the form below or email me directly at{' '}
          <a href="mailto:anivar.fw@gmail.com">anivar.fw@gmail.com</a>.
        </ContactInfo>
        
        {formData.name && isDirty && (
          <StorageInfo>
            <strong>Your form data is being saved locally.</strong> If you leave this page and come back later, your draft will still be here.
          </StorageInfo>
        )}
        
        {formattedLastSaved && (
          <SavedMessage>
            <span>Last saved: {formattedLastSaved}</span>
            <SecondaryButton 
              type="button" 
              onClick={resetForm}
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
            >
              Clear Saved Data
            </SecondaryButton>
          </SavedMessage>
        )}
        
        {submitSuccess && (
          <SuccessMessage>
            Thanks for reaching out! I'll get back to you soon.
          </SuccessMessage>
        )}
        
        {submitError && (
          <ErrorMessage>
            {submitError}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              required
            />
          </FormGroup>
          
          <ButtonGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
            
            {isDirty && (
              <SecondaryButton type="button" onClick={saveForm}>
                Save Draft
              </SecondaryButton>
            )}
            
            {isDirty && (
              <SecondaryButton type="button" onClick={resetForm}>
                Clear Form
              </SecondaryButton>
            )}
          </ButtonGroup>
        </Form>
      </Container>
    </ContactSection>
  );
};

export default Contact;