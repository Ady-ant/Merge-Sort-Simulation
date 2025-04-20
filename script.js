// Global state management for the visualization
const visualizationState = {
    currentArray: [],
    animationSteps: [],
    currentStepIndex: 0,
    isAnimationPaused: true,
    animationTimer: null
  };
  
// Initialize the application with a random array
function initializeApplication() {
  createRandomArray();
  
  // Add event listener for speed control
  const speedControl = document.getElementById('animation-speed');
  speedControl.addEventListener('change', () => {
    if (!visualizationState.isAnimationPaused && visualizationState.animationTimer) {
      // Restart animation with new speed
      clearInterval(visualizationState.animationTimer);
      
      const newSpeed = parseInt(speedControl.value);
      visualizationState.animationTimer = setInterval(() => {
        if (!visualizationState.isAnimationPaused) {
          advanceOneStep();
        }
      }, newSpeed);
    }
  });
}
  
  // Generate an array of random numbers for demonstration
  function createRandomArray() {
    const arraySize = 8;
    const minValue = 100;
    const maxValue = 999;
    
    visualizationState.currentArray = [];
    
    for (let i = 0; i < arraySize; i++) {
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      visualizationState.currentArray.push(randomNumber);
    }
    
    initializeSortVisualization();
  }
  
  // Process user-provided custom array input
  function processUserInput() {
    const userInputElement = document.getElementById("user-array-input");
    const inputValue = userInputElement.value.trim();
    
    if (!inputValue) {
      displayMessage("Please enter some numbers before submitting.");
      return;
    }
    
    // Parse and validate the input
    const parsedArray = inputValue
      .split(',')
      .map(item => parseInt(item.trim()))
      .filter(num => !isNaN(num));
    
    if (parsedArray.length === 0) {
      displayMessage("Please enter valid numbers separated by commas.");
      return;
    }
    
    visualizationState.currentArray = parsedArray;
    initializeSortVisualization();
    userInputElement.value = ''; // Clear input field
  }
  
  // Set up the visualization with the current array
  function initializeSortVisualization() {
    visualizationState.animationSteps = [];
    visualizationState.currentStepIndex = 0;
    visualizationState.isAnimationPaused = true;
    
    if (visualizationState.animationTimer) {
      clearInterval(visualizationState.animationTimer);
    }
    
    displayMessage("Ready to start visualization");
    generateMergeSortSteps(visualizationState.currentArray, 0);
    renderVisualizationStep(0);
  }
  
  // Render a specific step of the visualization
  function renderVisualizationStep(stepIndex) {
    const canvas = document.getElementById("visualization-canvas");
    canvas.innerHTML = ''; // Clear previous content
    
    const step = visualizationState.animationSteps[stepIndex];
    
    // Create visualization for each level of the recursion tree
    step.recursionLevels.forEach((level, depth) => {
      // Skip empty levels
      if (!level.some(value => value !== null)) return;
      
      const rowElement = document.createElement('div');
      rowElement.className = `array-row depth-${depth}`;
      
      level.forEach((value, index) => {
        if (value === null) return;
        
        const elementBox = document.createElement('div');
        elementBox.className = 'array-element';
        
        // Add special classes for highlighting
        if (step.highlightedElements && 
            step.highlightedElements.some(h => h.depth === depth && h.index === index)) {
          elementBox.classList.add('comparing');
        }
        
        if (step.mergedElements && 
            step.mergedElements.some(m => m.depth === depth && m.index === index)) {
          elementBox.classList.add('sorted');
        }
        
        elementBox.textContent = value;
        rowElement.appendChild(elementBox);
      });
      
      canvas.appendChild(rowElement);
    });
    
    displayMessage(step.description);
  }
  
  // Begin the animation sequence
  function beginVisualization() {
    if (visualizationState.animationSteps.length === 0) return;
    
    visualizationState.isAnimationPaused = false;
    const speedControl = document.getElementById('animation-speed');
    const animationSpeed = parseInt(speedControl.value);
    
    // Clear any existing timer before creating a new one
    if (visualizationState.animationTimer) {
      clearInterval(visualizationState.animationTimer);
    }
    
    visualizationState.animationTimer = setInterval(() => {
      if (!visualizationState.isAnimationPaused) {
        advanceOneStep();
      }
    }, animationSpeed);
  }
  
  // Pause the current animation
  function pauseVisualization() {
    visualizationState.isAnimationPaused = true;
    if (visualizationState.animationTimer) {
      clearInterval(visualizationState.animationTimer);
    }
  }
  
  // Reset the visualization to the beginning
  function restartVisualization() {
    pauseVisualization();
    visualizationState.currentStepIndex = 0;
    renderVisualizationStep(0);
  }
  
  // Advance to the next step in the visualization
  function advanceOneStep() {
    if (visualizationState.currentStepIndex >= visualizationState.animationSteps.length - 1) {
      pauseVisualization();
      displayMessage("Merge sort complete! Array is now sorted.");
      return;
    }
    
    visualizationState.currentStepIndex++;
    renderVisualizationStep(visualizationState.currentStepIndex);
  }
  
  // Generate all steps for merge sort visualization
  function generateMergeSortSteps(array, startIndex, depth = 0, levelState = []) {
    // Initialize level structure if needed
    if (!levelState[depth]) {
      levelState[depth] = Array(visualizationState.currentArray.length).fill(null);
    }
    
    // Update current level with array values
    for (let i = 0; i < array.length; i++) {
      levelState[depth][startIndex + i] = array[i];
    }
    
    // Record the splitting step
    const highlightedPositions = array.map((_, i) => ({
      depth: depth,
      index: startIndex + i
    }));
    
    visualizationState.animationSteps.push({
      recursionLevels: JSON.parse(JSON.stringify(levelState)),
      description: `Splitting array: [${array.join(', ')}]`,
      highlightedElements: highlightedPositions
    });
    
    // Base case: array of length 0 or 1
    if (array.length <= 1) return array;
    
    // Recursive case: split and merge
    const midpoint = Math.floor(array.length / 2);
    
    // Recursively sort left half
    const leftSorted = generateMergeSortSteps(
      array.slice(0, midpoint),
      startIndex,
      depth + 1,
      JSON.parse(JSON.stringify(levelState))
    );
    
    // Recursively sort right half
    const rightSorted = generateMergeSortSteps(
      array.slice(midpoint),
      startIndex + midpoint,
      depth + 1,
      JSON.parse(JSON.stringify(levelState))
    );
    
    // Merge the sorted halves
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Merge elements while maintaining sorted order
    while (leftIndex < leftSorted.length && rightIndex < rightSorted.length) {
      if (leftSorted[leftIndex] <= rightSorted[rightIndex]) {
        mergedArray.push(leftSorted[leftIndex]);
        leftIndex++;
      } else {
        mergedArray.push(rightSorted[rightIndex]);
        rightIndex++;
      }
    }
    
    // Add remaining elements from left array
    while (leftIndex < leftSorted.length) {
      mergedArray.push(leftSorted[leftIndex]);
      leftIndex++;
    }
    
    // Add remaining elements from right array
    while (rightIndex < rightSorted.length) {
      mergedArray.push(rightSorted[rightIndex]);
      rightIndex++;
    }
    
    // Update the current level with merged results
    for (let i = 0; i < mergedArray.length; i++) {
      levelState[depth][startIndex + i] = mergedArray[i];
    }
    
    // Record the merging step
    const mergedPositions = mergedArray.map((_, i) => ({
      depth: depth,
      index: startIndex + i
    }));
    
    visualizationState.animationSteps.push({
      recursionLevels: JSON.parse(JSON.stringify(levelState)),
      description: `Merged result: [${mergedArray.join(', ')}]`,
      mergedElements: mergedPositions
    });
    
    return mergedArray;
  }
  
  // Display a message in the status area
  function displayMessage(message) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
  }
  
  // Start the application when the page loads
  window.addEventListener('load', initializeApplication);