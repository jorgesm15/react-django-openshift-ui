// src/App.jsx

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/notes/');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notas
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <NoteForm 
            onSave={fetchNotes}
            editingNote={editingNote}
            setEditingNote={setEditingNote}
          />
        </Paper>
        <NoteList 
          notes={notes} 
          onDelete={fetchNotes}
          onEdit={setEditingNote}
        />
      </Box>
    </Container>
  );
}

export default App;