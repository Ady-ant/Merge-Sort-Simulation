Merge Sort Interactive Visualization Tool
A web-based educational tool that provides an interactive visualization of the merge sort algorithm, helping students understand this divide-and-conquer sorting technique through step-by-step animation.
Team Members

Aaryan Baadkar
Alapan Barman
Adyant Shrivastav

Institution: K.J. Somaiya College of Engineering
Course: Analysis of Algorithms
Project: IA2 Assignment - Algorithm Visualization
Project Overview
This interactive visualization tool was developed to help students understand the merge sort algorithm through visual demonstrations. The project offers an intuitive way to see how merge sort divides arrays and merges them back together in sorted order.
Features

Interactive Visualization: Step-by-step animation of the merge sort process
Custom Array Input: Ability to input custom arrays for sorting
Random Array Generation: Option to generate random arrays for demonstration
Animation Controls: Play, pause, and step-through functionality
Speed Control: Adjustable animation speed (slow, normal, fast)
Color-Coded Operations: Visual highlighting of comparison and merge operations
Algorithm Explanation: Detailed pseudocode and complexity analysis
Educational Content: Information about merge sort compared to other algorithms

Technical Implementation
Technologies Used

HTML5 for structure
CSS3 for styling with custom nature-inspired color theme
Vanilla JavaScript for logic and animation control

Key Components

Visual Elements

Array elements displayed as boxes
Color coding for comparisons and successful merges
Multiple levels showing recursion depth


Animation System

State management for tracking current steps
Interval-based animation with dynamic speed control
Step-by-step execution capability


User Interface

Control panel for array input and animation management
Information panel with collapsible sections for learning content
Status display for current operation



Algorithm Details
Merge Sort Complexity

Time Complexity: O(n log n) for all cases (best, average, worst)
Space Complexity: O(n) for the temporary arrays

How It Works

Divide: Recursively split the array into two halves
Conquer: Base case - single element arrays are already sorted
Merge: Combine sorted subarrays while maintaining order

Installation and Usage

Clone the repository:
bashgit clone [repository-url]

Navigate to the project directory:
bashcd merge-sort-visualization

Open index.html in a modern web browser
Use the controls to:

Enter a custom array (comma-separated numbers)
Generate a random array
Control animation playback
Adjust visualization speed



Project Structure
merge-sort-visualization/
├── index.html      # Main HTML structure
├── styles.css      # Styling with nature-inspired theme
├── script.js       # Core logic and animation control
└── README.md       # Project documentation
Development Process
This project was developed through iterative design and testing, with a focus on:

Creating an intuitive user interface
Implementing clear visual feedback for each algorithm step
Ensuring proper state management for smooth animations
Providing educational value through detailed explanations

Learning Outcomes
Through this project, our team gained experience in:

Algorithm visualization techniques
Web development with vanilla JavaScript
UI/UX design for educational tools
Collaborative software development

Acknowledgments
This project was developed as part of the Analysis of Algorithms course at K.J. Somaiya College of Engineering. We thank our professors for their guidance and support throughout the development process.
License
This project is created for educational purposes as part of our coursework at K.J. Somaiya College of Engineering.
