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
  background-color: rgba(12, 12, 12, 0.3); // Changed from solid to semi-transparent
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

const SavedMessage = styled.div`
  background: rgba(128, 128, 128, 0.2);
  color: #d4d4d4;
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
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

const SaveButton = styled.button`
  padding: 1rem 1.5rem;
  background: #2a2a2a;
  color: #d4d4d4;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3a3a3a;
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
  
  // Auto-save form when component unmounts
  useEffect(() => {
    return () => {
      if (isDirty) {
        saveForm();
      }
    };
  }, [isDirty, saveForm]);
  
  // Periodically auto-save if form is dirty (every 30 seconds)
  useEffect(() => {
    let interval;
    if (isDirty) {
      interval = setInterval(() => {
        saveForm();
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [isDirty, saveForm]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };
  
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
        
        {lastSaved && (
          <SavedMessage>
            Draft saved at {lastSaved.toLocaleTimeString()}
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
              <SecondaryButton type="button" onClick={resetForm}>
                Clear Form
              </SecondaryButton>
            )}
            
            {isDirty && (
              <SaveButton type="button" onClick={saveForm}>
                Save Draft
              </SaveButton>
            )}
          </ButtonGroup>
        </Form>
      </Container>
    </ContactSection>
  );
};

export default Contact;