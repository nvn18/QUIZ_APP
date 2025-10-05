import { useState } from 'react';
import { Star, MessageSquare, RotateCcw } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void;
  onRetake: () => void;
}

export default function FeedbackForm({ onSubmit, onRetake }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-400 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-6 rounded-full shadow-lg">
              <Star className="w-16 h-16 text-white fill-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-white/80 mb-8">
            Your feedback has been submitted successfully. We appreciate your time!
          </p>

          <button
            onClick={onRetake}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            We Value Your Feedback
          </h2>
          <p className="text-white/80 text-center mb-8">
            Help us improve your quiz experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-white font-medium mb-4 text-center text-lg">
                How would you rate this quiz?
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transform transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 transition-all duration-200 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/30 fill-white/10'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-white/80 mt-3 text-sm">
                  {rating === 1 && 'Poor - We\'ll work to improve'}
                  {rating === 2 && 'Fair - There\'s room for improvement'}
                  {rating === 3 && 'Good - Thanks for your feedback'}
                  {rating === 4 && 'Very Good - We\'re glad you enjoyed it'}
                  {rating === 5 && 'Excellent - Thank you for the amazing feedback!'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-3">
                Additional Comments (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none"
                placeholder="Share your thoughts about the quiz, questions, or overall experience..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onRetake}
                className="flex-1 bg-white/10 border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                type="submit"
                disabled={rating === 0}
                className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
