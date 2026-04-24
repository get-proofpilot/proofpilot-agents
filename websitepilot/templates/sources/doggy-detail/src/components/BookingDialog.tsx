import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDialog: React.FC<BookingDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Book an Appointment</DialogTitle>
        </VisuallyHidden>
        <iframe
          src="https://booking.moego.pet/ol/TheDoggyDetail/book?utm_medium=embed"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Online booking"
          scrolling="no"
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
};
