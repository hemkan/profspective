"use client";
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import TopNav from '../components/TopNav';

export default function RecommendationForm() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Add user's query to messages
    setMessages([...messages, { text: query, sender: 'user' }]);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: query,
      });

      if (response.ok) {
        const data = await response.json();

        // Format and add recommendations to messages
        const recommendationMessage = formatRecommendations(data);
        setMessages([...messages, { text: query, sender: 'user' }, { text: recommendationMessage, sender: 'assistant' }]);
      } else {
        setError('Failed to fetch recommendations');
        setMessages([...messages, { text: query, sender: 'user' }, { text: 'An error occurred while fetching recommendations.', sender: 'assistant' }]);
      }
    } catch (err) {
      setError('An error occurred');
      setMessages([...messages, { text: query, sender: 'user' }, { text: 'An error occurred while fetching recommendations.', sender: 'assistant' }]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format recommendations
  const formatRecommendations = (data) => {
    return data.map((rec) => {
      let recStr = `<strong>Class:</strong> ${rec.class}<br/>`;
      rec.professors.forEach((prof) => {
        recStr += `  - <strong>Professor:</strong> ${prof.name}<br/>`;
        recStr += `    <strong>Rating:</strong> ${prof.stars} stars<br/>`;
        recStr += `    <strong>Review:</strong> ${prof.review}<br/><br/>`;
      });
      return recStr;
    }).join('<br/>');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100%', 
      maxWidth: 800, 
      margin: 'auto', 
      padding: 2,
    }}>
      <TopNav />
      <Typography variant="h6" color="#E0DFFE" gutterBottom>
        Chat for Class and Professor Recommendations
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          padding: 2, 
          overflowY: 'auto' 
        }}
      >
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ 
              marginBottom: 1, 
              textAlign: msg.sender === 'user' ? 'right' : 'left' 
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  background: msg.sender === 'user' ? '#e0f7fa' : '#fff3e0', 
                  borderRadius: 1, 
                  padding: 1, 
                  display: 'inline-block', 
                  maxWidth: '75%', 
                  wordBreak: 'break-word' 
                }}
                component="div"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </Box>
          ))}
          {loading && <Typography variant="body1">Loading...</Typography>}
          {error && <Typography color="error" variant="body1">{error}</Typography>}
        </Box>
      </Paper>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          marginTop: 2, 
          gap: 1 
        }}
      >
        <TextField
          label="Enter your academic preferences"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#21A0A0', // Border color when input is not focused
              },
              '&:hover fieldset': {
                borderColor: '#046865', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#21A0A0', // Border color when focused
              },
            },
            '& .MuiInputBase-input': {
              color: '#FCFFF7', // Text color inside the input
            },
            '& .MuiFormLabel-root': {
              color: '#FCFFF7', // Label color
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#21A0A0', // Label color when focused
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </Box>
    </Box>
  );
}
