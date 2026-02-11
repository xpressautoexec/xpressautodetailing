import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const quickReplies = [
  "I'd like to book a detail",
  "What are your prices?",
  "What areas do you serve?",
  "Do you offer ceramic coating?",
];

const botResponses: Record<string, string> = {
  "I'd like to book a detail": "Awesome! You can book instantly through our online system — it only takes 60 seconds! 👉 [Book Now](https://xpressauto.fieldd.co/)\n\nOr tell me your preferred date/time and vehicle type, and we'll get you set up!",
  "What are your prices?": "Here's a quick overview:\n\n• **Exterior Detailing** — from $129\n• **Interior Detailing** — from $149\n• **Complete Detail** — from $249\n• **Ceramic Coating** — from $499\n\nPrices vary by vehicle size. Want a custom quote? Just tell us your vehicle!",
  "What areas do you serve?": "We serve **Calgary** and all surrounding areas including Airdrie, Cochrane, Chestermere, Okotoks, Strathmore, High River, Crossfield, Langdon, and Bearspaw. If you're within 30 min of Calgary, we can come to you! 🚗",
  "Do you offer ceramic coating?": "Yes! We use industry-leading ceramic coating products for lasting protection and a mirror-like finish. Packages start from **$499**.\n\nCeramic coating protects against UV, salt, bird droppings, and more. Want to book? 👉 [Book Now](https://xpressauto.fieldd.co/)",
};

const defaultResponse = "Thanks for reaching out! 😊 For the fastest response, you can:\n\n📞 Call us: **587-500-4523**\n📧 Email: **support@xpressautodetail.ca**\n📅 [Book Online](https://xpressauto.fieldd.co/)\n\nWe typically respond within 1–2 hours!";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text, sender: "bot", time: getTime() },
      ]);
    }, 800);
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: msg, sender: "user", time: getTime() },
    ]);
    setInput("");
    setShowQuickReplies(false);

    const response = botResponses[msg] || defaultResponse;
    addBotMessage(response);
  };

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          text: "Hey there! 👋 Welcome to Xpress Auto Detailing. How can we help you today?",
          sender: "bot",
          time: getTime(),
        },
      ]);
    }
  };

  const renderText = (text: string) => {
    // Simple markdown link rendering
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline font-semibold"
          >
            {linkMatch[1]}
          </a>
        );
      }
      // Bold
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith("**") && bp.endsWith("**")) {
          return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
        }
        return <span key={`${i}-${j}`}>{bp}</span>;
      });
    });
  };

  return (
    <>
      {/* Chat bubble */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-20 lg:bottom-6 left-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-brand-blue-deep transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-primary" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 lg:bottom-6 left-2 right-2 sm:left-4 sm:right-auto z-50 sm:w-[340px] max-h-[420px] sm:max-h-[480px] flex flex-col bg-background rounded-xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="bg-brand-dark px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-heading font-black text-primary text-xs">X</span>
            </div>
            <div className="flex-1">
              <p className="font-heading font-bold text-primary-foreground text-sm uppercase">
                Xpress Auto
              </p>
              <p className="text-brand-gray text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                We'll reply as soon as we can
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-brand-gray hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px] max-h-[320px] bg-muted/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground"
                  }`}
                >
                  {renderText(msg.text)}
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick replies */}
            {showQuickReplies && messages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="text-xs bg-background border border-primary/40 text-primary font-heading font-semibold rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-border flex items-center gap-2 bg-background"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How Can We Help?"
              className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-brand-blue-deep transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
