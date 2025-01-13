import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

const CustomModal = ({ open, onClose, title, children, onSaveClick }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "80%",
          height: "80%",
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {title && (
          <Typography id="custom-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        <Box
          id="custom-modal-description"
          sx={{
            mt: 2,
            flexGrow: 1, // Allows the content area to grow and take up remaining space
            overflowY: 'auto', // Enables vertical scrolling
          }}
        >
          {children}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={onSaveClick}
            variant="contained"
            sx={{ backgroundColor: "#FFB800", color: "#ffffff" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
