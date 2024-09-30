"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(
  (0, cors_1.default)({
    origin: "http://localhost:4200", // allow the server to accept requests from the Angular app
  }),
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB connection
const mongoUri = "mongodb://localhost:27017/individual_practice";
mongoose_1.default
  .connect(mongoUri, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Define routes
app.post("/api/users", user_controller_1.registerUser);
// app.get('/api/users', async (req: Request, res: Response) => {
//   const users = await User.find();
//   res.json(users);
// });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
