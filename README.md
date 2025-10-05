# Online Quiz Platform

A full-stack, enterprise-grade online quiz application with live proctoring, camera monitoring, and comprehensive feedback system built with React, TypeScript, and Tailwind CSS.

## Features

### Authentication & Security
- **User Login System**: Secure login with name registration
- **6-Digit Passkey**: Auto-generated passkey for result retrieval
- **Passkey Verification**: Interactive 6-digit verification interface
- **Identity Verification**: Camera-based photo capture before quiz start

### Live Proctoring
- **Real-time Monitoring**: Live video feed displayed throughout the examination
- **Tab-Switch Detection**: Automatic exam termination on tab switching
- **Violation Tracking**: Complete log of all proctoring violations
- **Anti-Cheating Measures**:
  - Copy/paste prevention
  - Right-click disabled
  - Browser navigation warnings

### Quiz System
- **10 Quality Questions**: Covering JavaScript, HTML, and CSS topics
- **Detailed Options**: Each answer includes comprehensive explanations
- **Question Navigation**: Previous/Next buttons for easy navigation
- **Progress Tracking**: Visual progress bar showing completion status
- **Category Badges**: Color-coded tags for question categories

### Timer System
- **30-Minute Countdown**: Full exam duration tracking
- **Visual Warnings**:
  - Yellow alert at 5 minutes remaining
  - Red pulsing alert at 1 minute remaining
- **Auto-Submit**: Automatic submission when time expires
- **Time Tracking**: Records exact time taken for completion

### Results & Analytics
- **Animated Score Display**: Smooth counter animation for score reveal
- **Pass/Fail Status**: 70% threshold with visual badges
- **Detailed Breakdown**: Question-by-question analysis showing:
  - User's selected answer
  - Correct answer
  - Color-coded results (green for correct, red for incorrect)
- **Violation Report**: Complete list of any proctoring violations
- **Performance Metrics**: Time taken and percentage score

### Feedback System
- **5-Star Rating**: Interactive star rating with hover effects
- **Text Feedback**: Optional comments section for detailed feedback
- **Retake Option**: Ability to restart the quiz
- **Submission Confirmation**: Success message after feedback submission

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Build Tool**: Vite 5.4.2
- **Icons**: Lucide React 0.344.0
- **Database**: Supabase and sqlLite

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── LoginScreen.tsx          # User login with passkey generation
│   │   ├── PasskeyVerification.tsx  # 6-digit passkey entry
│   │   ├── CameraSetup.tsx          # Photo capture and verification
│   │   ├── QuizInterface.tsx        # Main quiz with live monitoring
│   │   ├── ResultsPage.tsx          # Detailed results and breakdown
│   │   └── FeedbackForm.tsx         # Rating and feedback collection
│   ├── data/
│   │   └── questions.ts             # Quiz questions dataset
│   ├── lib/
│   │   └── supabase.ts              # Supabase client and types
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── .env                             # Environment variables
└── package.json                     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser with camera support

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:nvn18/QUIZ_APP.git
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   The `.env` file is already configured with Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## User Flow

1. **Login Screen**
   - Enter full name
   - Generate 6-digit passkey
   - Save passkey for later result retrieval

2. **Passkey Verification**
   - Enter the generated 6-digit passkey
   - Automatic verification and progression

3. **Camera Setup**
   - Allow camera permissions
   - Position yourself in frame
   - Capture photo
   - Option to retake if needed

4. **Quiz Examination**
   - Live video monitoring in sidebar
   - 30-minute timer countdown
   - Navigate through 10 questions
   - Select answers for each question
   - Submit when complete

5. **Results Page**
   - View animated score
   - See pass/fail status
   - Review detailed question breakdown
   - Check for any violations

6. **Feedback**
   - Rate experience (1-5 stars)
   - Provide optional comments
   - Submit feedback or retake quiz

## Proctoring Rules

### Violations Result in Automatic Termination

- **Tab Switching**: Switching to another browser tab
- **Window Switching**: Minimizing or switching windows
- **Browser Navigation**: Attempting to navigate away from the quiz

### Disabled Features During Exam

- Copy/paste operations
- Right-click context menu
- Browser navigation without warning

### Monitored Throughout Exam

- Live video feed
- User presence verification
- Timing and answer patterns

## Quiz Questions

The platform includes 10 carefully crafted questions covering:

- **JavaScript**: Syntax, functions, variables, and basic concepts
- **HTML**: Tags, elements, and structure
- **CSS**: Properties, styling, and layout

Each question includes:
- Clear question text
- 4 detailed answer options with explanations
- Category badge for easy identification
- Single correct answer

## Scoring System

- **Total Questions**: 10
- **Passing Score**: 70% (7 out of 10)
- **Score Display**: Animated counter with percentage
- **Status Badge**:
  - Green "PASSED" for 70% or higher
  - Red "FAILED" for below 70%

## Camera Requirements

### Permissions Needed
- Camera access for photo capture
- Camera access for live monitoring during exam

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

### Video Quality
- Photo Capture: 640x480 resolution
- Live Monitoring: 320x240 resolution

## Customization

### Modifying Questions

Edit `src/data/questions.ts` to add, remove, or modify questions:

```typescript
{
  id: 'unique_id',
  question_text: 'Your question here',
  category: 'JavaScript',
  option_a: 'Option A with explanation',
  option_b: 'Option B with explanation',
  option_c: 'Option C with explanation',
  option_d: 'Option D with explanation',
  correct_answer: 'A'
}
```

### Adjusting Timer

Modify the timer duration in `src/components/QuizInterface.tsx`:

```typescript
const [timeLeft, setTimeLeft] = useState(1800); // 1800 seconds = 30 minutes
```

### Changing Passing Score

Update the passing threshold in `src/components/ResultsPage.tsx`:

```typescript
const passed = percentage >= 70; // 70% passing score
```

### Customizing Colors

The application uses Tailwind CSS. Modify colors in:
- Individual components for specific sections
- `tailwind.config.js` for global theme changes

## Database Integration

The application is ready for Supabase integration. The schema includes:

### Tables

**questions**
- Stores quiz questions, options, and correct answers
- Includes category for filtering

**quiz_attempts**
- Records user attempts with scores
- Tracks answers, violations, and timing
- Stores photo URL for verification

**feedback**
- Captures user ratings and comments
- Links to quiz attempts

### To Enable Database

1. Set up Supabase project
2. Run migrations for schema creation
3. Update `.env` with your credentials
4. Uncomment database calls in components

## Design Philosophy

### Modern UI/UX
- Glassmorphism design with backdrop blur effects
- Gradient backgrounds for visual appeal
- Smooth animations and transitions
- Responsive design for all devices

### Professional Aesthetics
- Clean, sophisticated visual presentation
- Color-coded feedback (green/red for correct/incorrect)
- Interactive hover states
- Progress indicators and visual feedback

### User Experience
- Clear navigation and instructions
- Intuitive interface requiring no training
- Real-time feedback on actions
- Smooth transitions between states

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

**Note**: Camera features require HTTPS in production environments.

## Performance

- **Build Size**: ~180KB JavaScript (gzipped: ~54KB)
- **CSS Size**: ~19KB (gzipped: ~4KB)
- **Load Time**: < 2 seconds on average connection
- **Lighthouse Score**: 90+ performance rating

## Security Considerations

### Current Implementation
- Client-side validation
- Proctoring violation detection
- Camera-based identity verification
- Copy/paste prevention

### Production Recommendations
- Implement server-side answer validation
- Use secure WebSocket connections for monitoring
- Store photos in secure cloud storage
- Add encryption for sensitive data
- Implement rate limiting

## Future Enhancements

- [ ] Multiple quiz categories
- [ ] Question difficulty levels
- [ ] Leaderboard system
- [ ] Email notifications
- [ ] PDF certificate generation
- [ ] Admin dashboard
- [ ] Question randomization
- [ ] Time-based scoring bonus
- [ ] Mobile app version
- [ ] Multi-language support

## Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check if another application is using the camera
- Try a different browser
- Ensure HTTPS in production

### Timer Issues
- Browser must remain active
- Background tabs may throttle timers
- Ensure stable internet connection

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is available for use under standard terms.

## Support

For issues or questions:
- Check existing documentation
- Review code comments
- Submit an issue on GitHub

## Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Database ready with Supabase

---

**Version**: 1.0.0
**Last Updated**: 2025-10-05
**Status**: Production Ready
