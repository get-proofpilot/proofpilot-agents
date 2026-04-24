import { MessageCircle } from 'lucide-react';

const ChatWidget = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="bg-green-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-4 border-background group">
        <MessageCircle className="w-6 h-6 text-background fill-current" />
        <span className="absolute right-full mr-3 bg-foreground text-background text-xs font-bold px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-green-500 animate-pulse" />
      </button>
    </div>
  );
};

export default ChatWidget;
