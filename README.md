# WanderWorld - Full Stack Accommodation Booking Platform

A feature-rich accommodation booking platform built with Node.js, Express, MongoDB, and EJS. Users can create, and review property listings similar to Airbnb.

## Live Demo

**Deployed Application:** [https://full-stack-accommodation-booking-platform.onrender.com](https://full-stack-accommodation-booking-platform.onrender.com)

## Features

### User Features
- **User Authentication** - Secure signup, login, and logout functionality using Passport.js
- **Create Listings** - Authenticated users can add new properties
- **Edit & Delete** - Property owners can manage their listings
- **Reviews** - Users can leave ratings and reviews for properties
- **Interactive Maps** - Mapbox integration for location visualization
- **Image Uploads** - Cloudinary integration for property images
- **Flash Messages** - Real-time feedback for user actions

### Technical Features
- **Responsive Design** - Mobile-friendly interface using Bootstrap
- **Authorization** - Role-based access control for listings and reviews
- **Input Validation** - Server-side validation using Joi
- **Session Management** - MongoDB session store for persistent login
- **RESTful API** - Clean and organized route structure
- **Error Handling** - Custom error handling middleware

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **EJS** - Templating engine
- **Bootstrap 5** - CSS framework
- **JavaScript** - Client-side interactivity

### Authentication & Security
- **Passport.js** - Authentication middleware
- **passport-local** - Local authentication strategy
- **passport-local-mongoose** - Mongoose plugin for passport
- **express-session** - Session middleware
- **connect-mongo** - MongoDB session store
- **connect-flash** - Flash messages

### File Upload & Storage
- **Cloudinary** - Cloud-based image storage
- **Multer** - File upload handling
- **multer-storage-cloudinary** - Cloudinary storage engine for Multer

### Maps
- **Mapbox GL JS** - Interactive maps
- **@mapbox/mapbox-sdk** - Mapbox services SDK

### Validation
- **Joi** - Schema validation

## Project Structure

```
WanderWorld/
├── controllers/          # Route controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   └── users/
├── public/              # Static files
│   ├── css/
│   └── js/
├── utils/               # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── app.js              # Main application file
└── package.json        # Dependencies

```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Isha-Tated/Full_Stack_Accommodation_Booking_Platform.git
cd Full_Stack_Accommodation_Booking_Platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
ATLASDB_URL=your_mongodb_connection_string

# Session Secret
SECRET=your_secret_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox
MAP_TOKEN=your_mapbox_token

# Environment
NODE_ENV=development
```

4. **Run the application**
```bash
node app.js
```

The application will be available at `http://localhost:8000`

## Key Features Explained

### Authentication System
- Secure user registration and login
- Password hashing and salting with passport-local-mongoose
- Session-based authentication with MongoDB store
- Protected routes for authenticated users only

### Listing Management
- CRUD operations for property listings
- Image upload to Cloudinary
- Geocoding for location data using Mapbox
- Owner-based authorization for edit/delete operations

### Review System
- Users can rate properties (1-5 stars)
- Written reviews with timestamp
- Author attribution
- Only review authors can delete their reviews

### Interactive Maps
- Property locations displayed on interactive maps
- Geocoding integration converts addresses to coordinates
- Custom markers and popups

## Deployment

The application is deployed on **Render** with:
- Automatic deployments from GitHub
- MongoDB Atlas for database hosting
- Cloudinary for image storage
- Environment variables configured in Render dashboard

## API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## Security Features

- Password encryption using bcrypt
- Session-based authentication
- CSRF protection
- Input validation and sanitization
- Authorization checks for sensitive operations
- HTTP-only cookies for session management
- Environment variable protection for sensitive data

## Known Issues & Future Improvements

### Future Enhancements
- [ ] Search and filter functionality
- [ ] Booking system with calendar
- [ ] User profiles with dashboard
- [ ] Favorites/Wishlist feature
- [ ] Advanced search with price range and amenities
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Mobile app version

## Author

**Isha Tated**
- GitHub: [@Isha-Tated](https://github.com/Isha-Tated)
- Project Link: [https://github.com/Isha-Tated/Full_Stack_Accommodation_Booking_Platform](https://github.com/Isha-Tated/Full_Stack_Accommodation_Booking_Platform)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Bootstrap for the responsive UI framework
- Mapbox for mapping services
- Cloudinary for image hosting
- MongoDB Atlas for database hosting
- Render for deployment platform
- The open-source community for amazing packages

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**If you like this project, please give it a star on GitHub!**
