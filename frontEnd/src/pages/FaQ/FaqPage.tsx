import React, { useEffect, useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Container, Grid, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FaqPage.module.scss';
import { FeedBackService } from '../../services/feedback.service';
import { StyledTextField } from '../../assets/theme/theme';
import { validateFormData } from '../../utilities/helpers';
import { FormFieldDto } from '../../utilities/models';
import { toast } from 'react-toastify';

const Faqs = [
    { question: "What types of tea do you produce?", answer: "We produce black, green, oolong, and herbal teas." },
    { question: "How is your tea sourced?", answer: "Our tea is sourced directly from sustainable farms in various regions including China, India, and Kenya." },
    { question: "Can I visit your tea factory?", answer: "Yes, we offer guided tours of our factory from March to September. Please book in advance." },
    { question: "Do you provide international shipping?", answer: "Yes, we ship internationally. Shipping costs vary by destination and order size." },
    { question: "How should I store tea to keep it fresh?", answer: "Store tea in a cool, dry place away from direct sunlight. Use an airtight container to maintain freshness." },
    { question: "What is the shelf life of your teas?", answer: "Most of our teas have a shelf life of 18 to 24 months when stored properly in an airtight container away from light and moisture." },
    { question: "Are your teas organic?", answer: "Many of our teas are certified organic. Please check the product description for the organic certification label." },
    { question: "Do you offer tea tastings?", answer: "Yes, we host tea tasting sessions at our factory. These sessions are by appointment only, so please contact us to schedule one." },
    { question: "Can I customize my tea order?", answer: "Yes, we offer custom blending services for large orders. Contact us directly for more information and to discuss your needs." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and direct bank transfers for larger orders." },
    { question: "Do you have any loyalty or rewards program?", answer: "Yes, we have a loyalty program for returning customers which offers discounts and early access to new products." },
    { question: "What is your return policy?", answer: "We accept returns on unopened products within 30 days of purchase. Please see our website for detailed terms and conditions." },
    { question: "How do I know the tea I am buying is fresh?", answer: "We provide a 'packed on' date for all our teas, so you can be assured of its freshness." },
    { question: "Are there any benefits to drinking your teas?", answer: "Tea is rich in antioxidants and has been linked with various health benefits, including better heart health and reduced risks of certain diseases. Specific benefits can vary based on the type of tea." },
    { question: "Do you have any recommendations for first-time tea drinkers?", answer: "For new tea drinkers, we recommend starting with our sampler packs, which offer a variety of flavors to help you discover what you like best." }
];

interface FaqType {
  title: FormFieldDto<any>;
  email: FormFieldDto<any>;
  question: FormFieldDto<any|null>;
}

const FaqPage = () => {

  const INITIAL_FAQ_FORM: FaqType = {
    title:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    email:  { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
    question:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
  };
  
  const [faqs, setFaqs] = useState([]);
  const [FaqForm, setFaqForm] = useState<FaqType>(INITIAL_FAQ_FORM);
  const [helperText, setHelperText] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const [validateData, isValid] = await validateFormData(FaqForm);
    setFaqForm(validateData);
    setHelperText(true);
    if (isValid) {
      // Handle form submission logic here
     const payload={
        title:FaqForm.title.value,
        email:FaqForm.email.value,
        question:FaqForm.question.value
      }
        try {
          const response = await FeedBackService.ADDfaq(payload);
          console.log('response:', response);
      setFaqForm(INITIAL_FAQ_FORM);
      toast.success('FAQ submitted successfully,you will receive an email soon!');

        } catch (error) {
          console.error('Error submitting form:', error);
     }
    }
  };

  

  const handleChange = (field: keyof FaqType, value: any) => {
    setFaqForm((prevForm) => ({
      ...prevForm,
      [field]: {
        ...prevForm[field],
        value: value,
      },
    }));
  };

  const handleInputFocus = (property: string, section: string) => {
    if (section === "GI")
      setFaqForm({
      ...FaqForm,
      [property]: {
        ...FaqForm[property as keyof typeof FaqForm],
        error: null,
      },
    });

}
  return (
    <section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
      <Container maxWidth="md" sx={{ mt: "9rem" }}>
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Frequently Asked Questions
            </Typography>
            {Faqs.map((faq: { question: any; answer: any }, index: React.Key | null | undefined) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${index}`}
                >
                  <Typography sx={{ color: "white" }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} md={5} sx={{ justifyContent: "center", marginTop: "6rem" }}>
            <Box sx={{ flex: 1, background: "rgba(1, 104, 1, 0.4)", padding: "1rem", marginRight: "1rem" }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Submit a new FAQ</Typography>
                <StyledTextField
                  label="Email"
                  variant="outlined"
                  value={FaqForm.email.value}
                  error={!!FaqForm.email.error}
                  disabled={FaqForm.email.disable}
                  required={FaqForm.email.isRequired}
                  helperText={helperText && FaqForm.email.error}
                  onFocus={() => handleInputFocus('email', 'GI')}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <StyledTextField
                  label="Title"
                  variant="outlined"
                  value={FaqForm.title.value}
                  error={!!FaqForm.title.error}
                  disabled={FaqForm.title.disable}
                  required={FaqForm.title.isRequired}
                  helperText={helperText && FaqForm.title.error}
                  onFocus={() => handleInputFocus('title', 'GI')}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
                <StyledTextField
                  label="Question"
                  variant="outlined"
                  value={FaqForm.question.value}
                  error={!!FaqForm.question.error}
                  disabled={FaqForm.question.disable}
                  required={FaqForm.question.isRequired}
                  helperText={helperText && FaqForm.question.error}
                  onFocus={() => handleInputFocus('question', 'GI')}
                  onChange={(e) => handleChange('question', e.target.value)}
                  
                />
                
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Typography variant="caption">Our Agent will reply to you soon by email</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default FaqPage;
