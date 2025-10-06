import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now()); // Force GIF reload on component mount
  const [isMobile, setIsMobile] = useState(false);
  const [headerSlideIn, setHeaderSlideIn] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    laperfhome: false,
    rejoignez: false,
    dansun: false,
    solutions: false,
    film: false
  });
  const [showContactToast, setShowContactToast] = useState(false);
  const [contactButtonVisible, setContactButtonVisible] = useState(false);
  const [showAProposPage, setShowAProposPage] = useState(false);
  const [aproposPageIndex, setAproposPageIndex] = useState(0);
  const [aproposAnimationsVisible, setAproposAnimationsVisible] = useState(false);
  const [showRoulettePage, setShowRoulettePage] = useState(false);
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [filmImageSlideIn, setFilmImageSlideIn] = useState(true);
  const [columnPositions, setColumnPositions] = useState([-1500, -2000, -2500]);
  
  // Set responsive positions for mobile vs desktop
  useEffect(() => {
    if (isMobile) {
      // Mobile: cards are 550px tall
      // Starting positions: card 1 = outils (index 3), card 2 = plaques (index 4), card 3 = services (index 5)
      setColumnPositions([
        -3 * 550,  // Column 1: show outils (index 3)
        -4 * 550,  // Column 2: show plaques (index 4) 
        -5 * 550   // Column 3: show services (index 5)
      ]);
    } else {
      // Desktop: cards are 500px tall
      // Starting positions: card 1 = outils (index 3), card 2 = plaques (index 4), card 3 = services (index 5)
      setColumnPositions([
        -3 * 500,  // Column 1: show outils (index 3)
        -4 * 500,  // Column 2: show plaques (index 4)
        -5 * 500   // Column 3: show services (index 5)
      ]);
    }
  }, [isMobile]);
  const [sliderValue, setSliderValue] = useState(45); // 0-100 range
  
  // Step 1 form cursors
  const [step1Cursor1, setStep1Cursor1] = useState(50); // 0-100 range, starts at middle
  const [step1Cursor2, setStep1Cursor2] = useState(50); // 0-100 range, starts at middle
  const [cursor1Moved, setCursor1Moved] = useState(false); // Track if cursor has been moved
  const [cursor2Moved, setCursor2Moved] = useState(false); // Track if cursor has been moved
  
  // Manual input states for cursors
  const [isManualInput1, setIsManualInput1] = useState(false);
  const [isManualInput2, setIsManualInput2] = useState(false);
  const [manualInput1Value, setManualInput1Value] = useState('');
  const [manualInput2Value, setManualInput2Value] = useState('');
  
  // Step 1 checkboxes
  const [directChecked, setDirectChecked] = useState(false);
  const [constructorChecked, setConstructorChecked] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [showStep1CursorValidationError, setShowStep1CursorValidationError] = useState(false);
  
  // Step 2 manufacturer checkboxes
  const [michelinChecked, setMichelinChecked] = useState(false);
  const [continentalChecked, setContinentalChecked] = useState(false);
  const [bridgestoneChecked, setBridgestoneChecked] = useState(false);
  const [pirelliChecked, setPirelliChecked] = useState(false);
  const [dunlopChecked, setDunlopChecked] = useState(false);
  const [autresChecked, setAutresChecked] = useState(false);
  
  // Step 2 percentage values
  const [michelinPercent, setMichelinPercent] = useState('');
  const [continentalPercent, setContinentalPercent] = useState('');
  const [bridgestonePercent, setBridgestonePercent] = useState('');
  const [pirelliPercent, setPirelliPercent] = useState('');
  const [dunlopPercent, setDunlopPercent] = useState('');
  const [autresPercent, setAutresPercent] = useState('');
  const [showStep2ValidationError, setShowStep2ValidationError] = useState(false);
  
  // Step 3 cursor
  const [step3Cursor, setStep3Cursor] = useState(50); // 0-100 range, starts at middle
  const [step3CursorMoved, setStep3CursorMoved] = useState(false); // Track if cursor has been moved
  const [isManualInput3, setIsManualInput3] = useState(false);
  const [manualInput3Value, setManualInput3Value] = useState('');
  
  // Step 3 checkboxes (same as Step 1)
  const [step3DirectChecked, setStep3DirectChecked] = useState(false);
  const [step3ConstructorChecked, setStep3ConstructorChecked] = useState(false);
  const [showStep3ValidationError, setShowStep3ValidationError] = useState(false);
  const [showStep3CursorValidationError, setShowStep3CursorValidationError] = useState(false);
  
  // Step 4 cursor and checkboxes
  const [step4Cursor, setStep4Cursor] = useState(50); // 0-100 range, starts at middle
  const [step4CursorMoved, setStep4CursorMoved] = useState(false); // Track if cursor has been moved
  const [isManualInput4, setIsManualInput4] = useState(false);
  const [manualInput4Value, setManualInput4Value] = useState('');
  const [step4DirectChecked, setStep4DirectChecked] = useState(false);
  const [step4ConstructorChecked, setStep4ConstructorChecked] = useState(false);
  // Step 4 top checkboxes (above gauge)
  const [step4TopLeftChecked, setStep4TopLeftChecked] = useState(false);
  const [step4TopRightChecked, setStep4TopRightChecked] = useState(false);
  const [showStep4ValidationError, setShowStep4ValidationError] = useState(false);
  const [showStep4CursorValidationError, setShowStep4CursorValidationError] = useState(false);
  
  // Warning message states for maximum values
  const [showStep1MaxWarning, setShowStep1MaxWarning] = useState(false);
  const [showStep3MaxWarning, setShowStep3MaxWarning] = useState(false);
  const [showStep4MaxWarning, setShowStep4MaxWarning] = useState(false);
  
  // Step 5 checkboxes (same as Step 1 and 3)
  const [step5DirectChecked, setStep5DirectChecked] = useState(false);
  const [step5ConstructorChecked, setStep5ConstructorChecked] = useState(false);
  const [showStep5ValidationError, setShowStep5ValidationError] = useState(false);
  const [showStep6ValidationError, setShowStep6ValidationError] = useState(false);
  
  // Step 6 matrix inputs (4 columns × 3 rows)
  const [step6Matrix, setStep6Matrix] = useState([
    ['', '', '', ''], // Row 1
    ['', '', '', ''], // Row 2
    ['', '', '', '']  // Row 3
  ]);
  
  // Gains page animation
  const [finalGainsAmount, setFinalGainsAmount] = useState(0);
  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [showGainsButtons, setShowGainsButtons] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Calculate price based on slider value with different maximums for each cursor
  const calculatePrice = (value: number, cursorType?: string) => {
    let maxValue = 999; // default
    
    switch (cursorType) {
      case 'step1cursor1':
        maxValue = 30;
        break;
      case 'step1cursor2':
        maxValue = 9999;
        break;
      case 'step3cursor':
        maxValue = 4999;
        break;
      case 'step4cursor':
        maxValue = 100;
        break;
      default:
        maxValue = 999;
    }
    
    // Convert 0-100 range to 0-maxValue range
    const price = Math.round((value / 100) * maxValue);
    return price;
  };

  // Convert actual value back to cursor position (0-100)
  const calculateCursorPosition = (actualValue: number, cursorType: string) => {
    let maxValue = 999;
    
    switch (cursorType) {
      case 'step1cursor1':
        maxValue = 30;
        break;
      case 'step1cursor2':
        maxValue = 9999;
        break;
      case 'step3cursor':
        maxValue = 4999;
        break;
      case 'step4cursor':
        maxValue = 100;
        break;
    }
    
    return Math.max(0, Math.min(100, (actualValue / maxValue) * 100));
  };

  // Handle manual input for cursors
  const handleManualInput = (cursorType: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    const position = calculateCursorPosition(numValue, cursorType);
    
    switch (cursorType) {
      case 'step1cursor1':
        setStep1Cursor1(position);
        setCursor1Moved(true);
        setIsManualInput1(false);
        break;
      case 'step1cursor2':
        setStep1Cursor2(position);
        setCursor2Moved(true);
        setIsManualInput2(false);
        break;
      case 'step3cursor':
        setStep3Cursor(position);
        setStep3CursorMoved(true);
        setIsManualInput3(false);
        break;
      case 'step4cursor':
        setStep4Cursor(position);
        setStep4CursorMoved(true);
        setIsManualInput4(false);
        break;
    }
  };

  // Handle clicking on value display to enable manual input
  const handleValueClick = (cursorType: string) => {
    const currentValue = calculatePrice(
      cursorType === 'step1cursor1' ? step1Cursor1 :
      cursorType === 'step1cursor2' ? step1Cursor2 :
      cursorType === 'step3cursor' ? step3Cursor :
      step4Cursor,
      cursorType
    );
    
    switch (cursorType) {
      case 'step1cursor1':
        setManualInput1Value(currentValue.toString());
        setIsManualInput1(true);
        break;
      case 'step1cursor2':
        setManualInput2Value(currentValue.toString());
        setIsManualInput2(true);
        break;
      case 'step3cursor':
        setManualInput3Value(currentValue.toString());
        setIsManualInput3(true);
        break;
      case 'step4cursor':
        setManualInput4Value(currentValue.toString());
        setIsManualInput4(true);
        break;
    }
  };

  // Calculate total percentage for Step 2
  const calculateTotalPercent = () => {
    const total = 
      (michelinChecked ? parseFloat(michelinPercent) || 0 : 0) +
      (continentalChecked ? parseFloat(continentalPercent) || 0 : 0) +
      (bridgestoneChecked ? parseFloat(bridgestonePercent) || 0 : 0) +
      (pirelliChecked ? parseFloat(pirelliPercent) || 0 : 0) +
      (dunlopChecked ? parseFloat(dunlopPercent) || 0 : 0) +
      (autresChecked ? parseFloat(autresPercent) || 0 : 0);
    return total;
  };

  // Email sending function
  const sendSimulationResults = async () => {
    if (!userEmail.trim()) return;

    setIsEmailSending(true);
    
    try {
      // Initialize EmailJS (you'll need to replace these with your actual values)
      const serviceId = 'service_l7nepku'; // Replace with your EmailJS service ID
       const templateId = 'template_xfcauih'; // Replace with your actual EmailJS template ID
      const publicKey = 'ee-HXIfPcvKqvguxQ'; // Replace with your EmailJS public key

      // Prepare template parameters
      const templateParams = {
        name: 'Utilisateur PERF', // Recipient name (for {{name}})
        email: userEmail, // This matches {{email}} in your EmailJS template
        user_email: userEmail,
        gains_amount: currentDisplayAmount.toLocaleString(),
        
        // Pneumatiques (Step 1)
        pneus_count: cursor1Moved ? calculatePrice(step1Cursor1, 'step1cursor1') : 'N/A',
        pneus_ca: cursor2Moved ? calculatePrice(step1Cursor2, 'step1cursor2') : 'N/A',
        pneus_manufacturers: [
          michelinChecked ? `Michelin: ${michelinPercent}%` : '',
          continentalChecked ? `Continental: ${continentalPercent}%` : '',
          bridgestoneChecked ? `Bridgestone: ${bridgestonePercent}%` : '',
          pirelliChecked ? `Pirelli: ${pirelliPercent}%` : '',
          dunlopChecked ? `Dunlop: ${dunlopPercent}%` : '',
          autresChecked ? `Autres: ${autresPercent}%` : ''
        ].filter(Boolean).join(', ') || 'N/A',
        pneus_facturation: directChecked ? 'En Direct' : constructorChecked ? 'Constructeur' : 'N/A',
        
        // Peinture (Step 3)
        peinture_ca: step3CursorMoved ? calculatePrice(step3Cursor, 'step3cursor') : 'N/A',
        peinture_facturation: step3DirectChecked ? 'En Direct' : step3ConstructorChecked ? 'Constructeur' : 'N/A',
        
        // Plaques (Step 4)
        plaques_type: step4TopLeftChecked && step4TopRightChecked ? 'Plaques standards et spéciales' : 
                     step4TopLeftChecked ? 'Plaques standards' : 
                     step4TopRightChecked ? 'Plaques spéciales' : 'N/A',
        plaques_count: step4CursorMoved ? calculatePrice(step4Cursor, 'step4cursor') : 'N/A',
        plaques_facturation: step4DirectChecked ? 'En Direct' : step4ConstructorChecked ? 'Constructeur' : 'N/A',
        
        // Lubrifiants (Step 5)
        lube_norme: step6Matrix[0] && step6Matrix[0][0] && step6Matrix[0][0].trim() ? step6Matrix[0][0] : 'N/A',
        lube_grade: step6Matrix[0] && step6Matrix[0][1] && step6Matrix[0][1].trim() ? step6Matrix[0][1] : 'N/A',
        lube_volume: step6Matrix[0] && step6Matrix[0][2] && step6Matrix[0][2].trim() ? step6Matrix[0][2] : 'N/A',
        lube_conditionnement: step6Matrix[0] && step6Matrix[0][3] && step6Matrix[0][3].trim() ? step6Matrix[0][3] : 'N/A',
        lube_facturation: step5DirectChecked ? 'En Direct' : step5ConstructorChecked ? 'Constructeur' : 'N/A',
        
        // Date
        date: new Date().toLocaleDateString('fr-FR')
      };

      // Debug: Log the template parameters to verify data
      console.log('📧 Email Template Parameters:', templateParams);

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setUserEmail('');
        setEmailSent(false);
        setIsEmailSending(false);
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
      setIsEmailSending(false);
    }
  };

  // Update Step 6 matrix value
  const updateStep6Matrix = (row: number, col: number, value: string) => {
    const newMatrix = [...step6Matrix];
    newMatrix[row][col] = value;
    setStep6Matrix(newMatrix);
  };

  // Function to check if at least one complete line is filled in Step 6
  const isStep6Valid = () => {
    return step6Matrix.some(row => 
      row.every(cell => cell.trim() !== '')
    );
  };

  // Function to show warning message and hide it after duration
  const showMaxWarning = (step: number) => {
    switch (step) {
      case 1:
        setShowStep1MaxWarning(true);
        setTimeout(() => setShowStep1MaxWarning(false), 3000); // Hide after 3 seconds
        break;
      case 3:
        setShowStep3MaxWarning(true);
        setTimeout(() => setShowStep3MaxWarning(false), 3000); // Hide after 3 seconds
        break;
      case 4:
        setShowStep4MaxWarning(true);
        setTimeout(() => setShowStep4MaxWarning(false), 3000); // Hide after 3 seconds
        break;
    }
  };

  // Calculate real gains amount based on formula and start rolling animation
  const generateGainsAmount = () => {
    // Get Step 1 cursor values
    const step1Cursor1Value = calculatePrice(step1Cursor1, 'step1cursor1'); // Volume in K units
    const step1Cursor2Value = calculatePrice(step1Cursor2, 'step1cursor2'); // Revenue in K€
    const step1SecondGaugeValue = step1Cursor2Value * 1000; // Convert K€ to €
    
    // Get Step 3 cursor value (in K€) and convert to actual euros
    const step3RawValue = calculatePrice(step3Cursor, 'step3cursor');
    const step3Value = step3RawValue * 1000; // Convert K€ to €
    
    // Determine multiplier based on Step 1 checkbox selection
    let step1Multiplier = 0;
    if (directChecked || constructorChecked) {
      step1Multiplier = 1.0; // No reduction - full value for both "En direct" and "Constructeur"
    }
    
    // Determine multiplier based on Step 3 checkbox selection
    let step3Multiplier = 0;
    if (step3DirectChecked) {
      step3Multiplier = 0.70; // 70% for "En direct"
    } else if (step3ConstructorChecked) {
      step3Multiplier = 0.55; // 55% for "Constructeur"
    }
    
    // Debug logging
    console.log('\n🔍 =============== GAINS CALCULATION DEBUG ===============');
    console.log('\n📊 STEP 1 - PNEU (Tires)');
    console.log('├─ 🎯 Cursor 1 (Volume): ' + (cursor1Moved ? `✅ ${step1Cursor1Value}K units` : '❌ Not moved'));
    console.log('├─ 🎯 Cursor 2 (Revenue): ' + (cursor2Moved ? `✅ ${step1Cursor2Value}K€ (${step1SecondGaugeValue.toLocaleString()}€)` : '❌ Not moved'));
    console.log('├─ 📋 Billing: ' + (directChecked ? '✅ En Direct (100%)' : constructorChecked ? '✅ Constructeur (100%)' : '❌ None selected'));
    console.log('└─ 🔢 Multiplier: ' + (step1Multiplier * 100) + '%');
    
    console.log('\n📊 STEP 3 - PEINTURE (Paint)');
    console.log('├─ 🎯 Cursor: ' + (step3CursorMoved ? `✅ ${step3RawValue}K€ (${step3Value.toLocaleString()}€)` : '❌ Not moved'));
    console.log('├─ 📋 Billing: ' + (step3DirectChecked ? '✅ En Direct (70%)' : step3ConstructorChecked ? '✅ Constructeur (55%)' : '❌ None selected'));
    console.log('└─ 🔢 Multiplier: ' + (step3Multiplier * 100) + '%');
    
    // Determine Step 1 contribution based on which cursors were moved and their values
    let step1Contribution = 0;
    let scenarioUsed = '';
    
    if (cursor2Moved && step1Cursor2Value === 0) {
      // 2nd cursor is set to 0: use 1st cursor formula regardless of cursor1 movement
      step1Contribution = (170 * step1Cursor1Value * 1000 * 0.25) * step1Multiplier;
      scenarioUsed = '2nd cursor set to 0 - using (170 * cursor1 * 1000 * 25%) * multiplier';
    } else if (cursor1Moved && cursor2Moved) {
      // Both cursors moved and 2nd cursor is not 0: use only 2nd cursor * 25%
      step1Contribution = (step1SecondGaugeValue * 0.25) * step1Multiplier;
      scenarioUsed = 'Both cursors moved - using (2nd cursor * 25%) * multiplier';
    } else if (cursor1Moved && !cursor2Moved) {
      // Only 1st cursor moved: 170 * 1st cursor * 25%
      step1Contribution = (170 * step1Cursor1Value * 1000 * 0.25) * step1Multiplier;
      scenarioUsed = 'Only 1st cursor moved - using (170 * cursor1 * 1000 * 25%) * multiplier';
    } else if (!cursor1Moved && cursor2Moved) {
      // Only 2nd cursor moved: 2nd cursor * 25%
      step1Contribution = (step1SecondGaugeValue * 0.25) * step1Multiplier;
      scenarioUsed = 'Only 2nd cursor moved - using (2nd cursor * 25%) * multiplier';
    }
    
    const step3Contribution = step3Value * step3Multiplier;
    const subtotal = step1Contribution + step3Contribution;
    const finalAmount = Math.round(subtotal + (subtotal * 0.30)); // Add 30% bonus and round
    
    console.log('\n💰 CALCULATION RESULTS');
    console.log('├─ 📝 Scenario: ' + scenarioUsed);
    console.log('├─ 🔸 Step 1 Contribution: ' + step1Contribution.toLocaleString() + '€');
    console.log('├─ 🔸 Step 3 Contribution: ' + step3Contribution.toLocaleString() + '€');
    console.log('├─ 📊 Subtotal: ' + subtotal.toLocaleString() + '€');
    console.log('├─ 🎁 Bonus (+30%): ' + Math.round(subtotal * 0.30).toLocaleString() + '€');
    console.log('└─ 🏆 FINAL AMOUNT: ' + finalAmount.toLocaleString() + '€');
    console.log('\n🔍 ===============================================\n');
    
    setFinalGainsAmount(finalAmount);
    setCurrentDisplayAmount(0);
    setIsRolling(true);
    setShowGainsButtons(false); // Hide buttons initially
    setShowSecondButton(false);
    
    // Rolling animation - numbers increase gradually to final amount
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = finalAmount / steps;
    let currentStep = 0;
    
    const rollInterval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCurrentDisplayAmount(finalAmount);
        setIsRolling(false);
        clearInterval(rollInterval);
        
        // Show buttons with staggered delay after gains animation completes
        setTimeout(() => {
          setShowGainsButtons(true);
        }, 500); // 0.5 second delay after gains animation
        
        setTimeout(() => {
          setShowSecondButton(true);
        }, 700); // 0.7 second delay for second button (0.2s after first)
      } else {
        // Add some randomness to make it look more exciting
        const randomVariation = Math.random() * increment * 0.3;
        setCurrentDisplayAmount(Math.floor(currentStep * increment + randomVariation));
      }
    }, duration / steps);
  };

  // New Simulator Form State
  const [showSimuForm, setShowSimuForm] = useState(false);
  const [currentSimuStep, setCurrentSimuStep] = useState(1);
  const [isStepFlipping, setIsStepFlipping] = useState(false);
  const [simuFormData, setSimuFormData] = useState({
    step1: { volume: '', revenue: '', billing: 'direct', manufacturers: [] },
    step2: { manufacturers: [] },
    step3: { revenue: '', billing: 'direct' },
    step4: { material: '', billing: 'direct' },
    step5: { volume: '', billing: 'direct' },
    step6: { oils: [] }
  });

  const simuSteps = [
    { id: 1, image: '/UI & UX SIMU/SIMU 1 - PNEU/SIMU 1 - PNEU X.png' },
    { id: 2, image: '/UI & UX SIMU/SIMU 2 - PNEU/SIMU 2 - PNEU X.png' },
    { id: 3, image: '/UI & UX SIMU/SIMU 3 - PEINTURE/SIMU 3 - PEINTURE X.png' },
    { id: 4, image: '/UI & UX SIMU/SIMU 4 - PLAQUES/SIMU 4 - PLAQUES X.png' },
    { id: 5, image: '/UI & UX SIMU/SIMU 5 - LUBRIFIANTS/SIMU 5 - LUBRIFIANTS X.png' },
    { id: 6, image: '/UI & UX SIMU/SIMU 6 - LUBRIFIANTS/SIMU 6 - LUBRIFIANTS X.png' }
  ];

  // Preload SIMU step images for smoother transitions
  useEffect(() => {
    simuSteps.forEach(step => {
      const img = new Image();
      img.src = step.image;
    });
  }, []);

  const nextSimuStep = () => {
    if (isStepFlipping) return;
    
    // Validate Step 1 - at least one checkbox must be checked
    if (currentSimuStep === 1 && !directChecked && !constructorChecked) {
      setShowValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 1 - at least one cursor must be moved
    if (currentSimuStep === 1 && (!cursor1Moved && !cursor2Moved)) {
      setShowStep1CursorValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep1CursorValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 2 - total percentage must equal 100%
    if (currentSimuStep === 2) {
      const totalPercent = calculateTotalPercent();
      const hasSelectedManufacturers = michelinChecked || continentalChecked || bridgestoneChecked || pirelliChecked || dunlopChecked || autresChecked;
      
      if (!hasSelectedManufacturers || totalPercent !== 100) {
        setShowStep2ValidationError(true);
        // Hide error after 3 seconds
        setTimeout(() => {
          setShowStep2ValidationError(false);
    // Reset Step 3 cursor
    setStep3Cursor(50);
    setStep3CursorMoved(false);
    // Reset Step 3 checkboxes
    setStep3DirectChecked(false);
    setStep3ConstructorChecked(false);
    // Reset Step 4 cursor and checkboxes
    setStep4Cursor(50);
    setStep4CursorMoved(false);
    setStep4DirectChecked(false);
    setStep4ConstructorChecked(false);
    setStep4TopLeftChecked(false);
    setStep4TopRightChecked(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
        }, 3000);
        return;
      }
    }
    
    // Validate Step 3 - at least one checkbox must be checked
    if (currentSimuStep === 3 && !step3DirectChecked && !step3ConstructorChecked) {
      setShowStep3ValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep3ValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 3 - cursor must be moved
    if (currentSimuStep === 3 && !step3CursorMoved) {
      setShowStep3CursorValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep3CursorValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 4 - at least one bottom checkbox (En direct OR Constructeur) must be checked
    if (currentSimuStep === 4 && !step4DirectChecked && !step4ConstructorChecked) {
      setShowStep4ValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep4ValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 4 - cursor must be moved
    if (currentSimuStep === 4 && !step4CursorMoved) {
      setShowStep4CursorValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep4CursorValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 5 - at least one checkbox must be checked
    if (currentSimuStep === 5 && !step5DirectChecked && !step5ConstructorChecked) {
      setShowStep5ValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep5ValidationError(false);
      }, 3000);
      return;
    }
    
    // Validate Step 6 - at least one complete line must be filled
    if (currentSimuStep === 6 && !isStep6Valid()) {
      setShowStep6ValidationError(true);
      // Hide error after 3 seconds
      setTimeout(() => {
        setShowStep6ValidationError(false);
      }, 3000);
      return;
    }
    
    // Clear validation errors when moving to next step
    setShowValidationError(false);
    setShowStep1CursorValidationError(false);
    setShowStep2ValidationError(false);
    setShowStep3ValidationError(false);
    setShowStep3CursorValidationError(false);
    setShowStep4ValidationError(false);
    setShowStep4CursorValidationError(false);
    setShowStep5ValidationError(false);
    setShowStep6ValidationError(false);
    setIsStepFlipping(true);
    
    setTimeout(() => {
      if (currentSimuStep < 6) {
        setCurrentSimuStep(currentSimuStep + 1);
      } else {
        setCurrentSimuStep(7);
        // Hide buttons immediately when reaching results page
        setShowGainsButtons(false);
        setShowSecondButton(false);
        // Start gains animation when reaching results page
        setTimeout(() => {
          generateGainsAmount();
        }, 500);
      }
      setIsStepFlipping(false);
    }, 180);
  };

  const prevSimuStep = () => {
    if (isStepFlipping) return;
    setIsStepFlipping(true);
    
    setTimeout(() => {
      if (currentSimuStep > 1) {
        setCurrentSimuStep(currentSimuStep - 1);
      }
      setIsStepFlipping(false);
    }, 180);
  };

  const openSimuForm = () => {
    console.log('🎯 openSimuForm called - setting showSimuForm to true, currentSimuStep to 1');
    setShowSimuForm(true);
    setCurrentSimuStep(1);
    setIsStepFlipping(false);
    // Reset cursors to middle and red
    setStep1Cursor1(50);
    setStep1Cursor2(50);
    setCursor1Moved(false);
    setCursor2Moved(false);
    // Reset checkboxes
    setDirectChecked(false);
    setConstructorChecked(false);
    setShowValidationError(false);
    // Reset Step 2 checkboxes
    setMichelinChecked(false);
    setContinentalChecked(false);
    setBridgestoneChecked(false);
    setPirelliChecked(false);
    setDunlopChecked(false);
    setAutresChecked(false);
    // Reset Step 2 percentages
    setMichelinPercent('');
    setContinentalPercent('');
    setBridgestonePercent('');
    setPirelliPercent('');
    setDunlopPercent('');
    setAutresPercent('');
    setShowStep2ValidationError(false);
    // Reset Step 3 cursor
    setStep3Cursor(50);
    setStep3CursorMoved(false);
    // Reset Step 3 checkboxes
    setStep3DirectChecked(false);
    setStep3ConstructorChecked(false);
    // Reset Step 4 cursor and checkboxes
    setStep4Cursor(50);
    setStep4CursorMoved(false);
    setStep4DirectChecked(false);
    setStep4ConstructorChecked(false);
    setStep4TopLeftChecked(false);
    setStep4TopRightChecked(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
  };

  const closeSimuForm = () => {
    setShowSimuForm(false);
    setCurrentSimuStep(1);
    setIsStepFlipping(false);
    // Reset cursors
    setStep1Cursor1(50);
    setStep1Cursor2(50);
    setCursor1Moved(false);
    setCursor2Moved(false);
    // Reset checkboxes
    setDirectChecked(false);
    setConstructorChecked(false);
    setShowValidationError(false);
    // Reset Step 2 checkboxes
    setMichelinChecked(false);
    setContinentalChecked(false);
    setBridgestoneChecked(false);
    setPirelliChecked(false);
    setDunlopChecked(false);
    setAutresChecked(false);
    // Reset Step 2 percentages
    setMichelinPercent('');
    setContinentalPercent('');
    setBridgestonePercent('');
    setPirelliPercent('');
    setDunlopPercent('');
    setAutresPercent('');
    setShowStep2ValidationError(false);
    // Reset Step 3 cursor
    setStep3Cursor(50);
    setStep3CursorMoved(false);
    // Reset Step 3 checkboxes
    setStep3DirectChecked(false);
    setStep3ConstructorChecked(false);
    // Reset Step 4 cursor and checkboxes
    setStep4Cursor(50);
    setStep4CursorMoved(false);
    setStep4DirectChecked(false);
    setStep4ConstructorChecked(false);
    setStep4TopLeftChecked(false);
    setStep4TopRightChecked(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
  };
  
  // Define the 6 roulette images in the new order: pneumatique - peinture - lubrifiants - outillage - plaques - services
  const rouletteImages = [
    '/roulette/pneu.png',        // 0: pneumatique
    '/roulette/peinture.png',    // 1: peinture
    '/roulette/lubrifiants.png', // 2: lubrifiants
    '/roulette/outils.png',      // 3: outillage
    '/roulette/PLAQUES.png',     // 4: plaques
    '/roulette/SERVICES.png'     // 5: services
  ];
  

  // Create extended array of images for seamless looping (50 sets of 6 images = 300 total)
  // This provides plenty of cards for infinite scrolling in both directions
  const createExtendedRouletteImages = (baseImages: string[], sets: number = 50) => {
    const extendedImages = [];
    for (let i = 0; i < sets; i++) {
      extendedImages.push(...baseImages);
    }
    return extendedImages;
  };
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ y: 0, column: 0, initialPosition: 0 });
  const [aproposSectionsVisible, setAproposSectionsVisible] = useState({
    nosValeurs: false,
    partenariat: false,
    expertise: false,
    rentabilite: false,
    fiabilite: false
  });
  const [marquesOpacity, setMarquesOpacity] = useState(1);
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const [videoPlaceAnimated, setVideoPlaceAnimated] = useState(true);
  const [showCalculatorPage, setShowCalculatorPage] = useState(false);
  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [solutionsTextVisible, setSolutionsTextVisible] = useState(false);
  const [solutionsIconsVisible, setSolutionsIconsVisible] = useState(false);
  const [solutionsButtonVisible, setSolutionsButtonVisible] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [fadeOutScrollToTop, setFadeOutScrollToTop] = useState(false);
  const [isNavigatingToSimulator, setIsNavigatingToSimulator] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Start timer to show main content after 6.3 seconds
    const timer = setTimeout(() => {
      setShowMainContent(true);
    }, 6300);

    // Reset GIF key when page becomes visible (handles browser tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setGifKey(Date.now()); // Reset GIF animation when page becomes visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Start animation sequence when main content shows
    if (showMainContent) {
      // Header slides in from top immediately
      const timer0 = setTimeout(() => setHeaderSlideIn(true), 100);
      
      
      return () => {
        clearTimeout(timer0);
      };
    }
  }, [showMainContent]);

  // Trigger Solutions animations when section becomes visible
  useEffect(() => {
    if (visibleSections.solutions && !solutionsVisible) {
      console.log('Solutions section visible - triggering animations');
      setSolutionsVisible(true);
      
      // Trigger text animations first
      setTimeout(() => setSolutionsTextVisible(true), 200);
      
      // Trigger icons animation after text
      setTimeout(() => setSolutionsIconsVisible(true), 800);
      
      // Trigger button animation last
      setTimeout(() => setSolutionsButtonVisible(true), 1500);
    } else if (!visibleSections.solutions && solutionsVisible) {
      console.log('Solutions section not visible - resetting animations');
      setSolutionsVisible(false);
      setSolutionsTextVisible(false);
      setSolutionsIconsVisible(false);
      setSolutionsButtonVisible(false);
    }
  }, [visibleSections.solutions, solutionsVisible]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionName = entry.target.getAttribute('data-section');
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [sectionName as string]: true
          }));
          
           // Gradual fade for marques2.gif between rejoignez and dansun
           if (sectionName === 'laperfhome') {
             setMarquesOpacity(1);
           } else if (sectionName === 'rejoignez') {
             // Calculate fade based on how far we are through the rejoignez section
             const rejoignezElement = document.querySelector('[data-section="rejoignez"]');
             if (rejoignezElement) {
               const rect = rejoignezElement.getBoundingClientRect();
               const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
               const fadeOpacity = Math.max(0, 1 - (sectionProgress * 1.5)); // Start fading at 67% through section
               setMarquesOpacity(fadeOpacity);
             }
           } else if (sectionName === 'dansun' || sectionName === 'solutions' || sectionName === 'film') {
             setMarquesOpacity(0);
           }
        } else {
          setVisibleSections(prev => ({
            ...prev,
            [sectionName as string]: false
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [showMainContent]);

  // Hide marques2.gif when A Propos, Roulette, or Video page is shown
  useEffect(() => {
    if (showAProposPage) {
      setMarquesOpacity(0);
      // Trigger A Propos animations
      setTimeout(() => setAproposAnimationsVisible(true), 200);
    } else if (showRoulettePage) {
      setMarquesOpacity(0);
    } else if (showVideoPage) {
      setMarquesOpacity(0);
      // Reset and trigger film image slide-in animation
      setFilmImageSlideIn(false);
      setTimeout(() => setFilmImageSlideIn(true), 200);
    } else {
      setMarquesOpacity(1);
      setAproposAnimationsVisible(false);
      setFilmImageSlideIn(false);
      // Reset all section visibility when leaving A Propos page
      setAproposSectionsVisible({
        nosValeurs: false,
        partenariat: false,
        expertise: false,
        rentabilite: false,
        fiabilite: false
      });
    }
  }, [showAProposPage, showRoulettePage, showVideoPage]);

  // Handle A Propos page scroll animations
  useEffect(() => {
    if (!showAProposPage) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionName = entry.target.getAttribute('data-apropos-section');
        if (entry.isIntersecting) {
          setAproposSectionsVisible(prev => ({
            ...prev,
            [sectionName as string]: true
          }));
        } else {
          setAproposSectionsVisible(prev => ({
            ...prev,
            [sectionName as string]: false
          }));
        }
      });
    }, observerOptions);

    // Observe all A Propos sections
    const aproposSections = document.querySelectorAll('[data-apropos-section]');
    aproposSections.forEach(section => observer.observe(section));

    return () => {
      aproposSections.forEach(section => observer.unobserve(section));
    };
  }, [showAProposPage]);

  useEffect(() => {
    // Handle scroll to video place transition and scroll up to go back
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollY = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = (scrollY / maxScroll) * 100;
      
      console.log('Scroll Debug:', {
        scrollY,
        scrollHeight,
        clientHeight,
        maxScroll,
        scrollPercentage: Math.round(scrollPercentage) + '%',
        solutionsThreshold: scrollHeight * 0.6,
        shouldTriggerSolutions: scrollY >= scrollHeight * 0.6,
        solutionsVisible,
        solutionsTextVisible,
        solutionsIconsVisible,
        solutionsButtonVisible,
        showScrollToTop,
        scrollToTopThreshold: maxScroll * 0.95,
        shouldShowScrollToTop: scrollY >= maxScroll * 0.95
      });
      
      
      // Check if we've scrolled to the video place section (around 3/4 of the scroll)
      // Show contact button when reaching video place area
      if (scrollY >= scrollHeight * 0.75 && !contactButtonVisible) {
        console.log('Reached video place area - showing contact button');
        setContactButtonVisible(true);
        setVideoPlaceAnimated(true);
      }
      
      // Solutions animations are now handled by Intersection Observer
      
      // Check if we've scrolled to the calculator section (around 60% of the scroll)
      // Trigger calculator page
      if (scrollY >= scrollHeight * 0.6 && !showCalculatorPage) {
        console.log('Reached calculator area - showing calculator page');
        setShowCalculatorPage(true);
        setCalculatorVisible(true);
      }
      
      // Check if we've reached the end of the scroll (when we're near the bottom)
      // Show scroll to top button
      if (scrollY >= maxScroll * 0.95 && !showScrollToTop) {
        console.log('Showing scroll to top button at', Math.round(scrollPercentage) + '%');
        setFadeOutScrollToTop(false);
        setShowScrollToTop(true);
      } else if (scrollY < maxScroll * 0.95 && showScrollToTop && !fadeOutScrollToTop) {
        console.log('Fading out scroll to top button at', Math.round(scrollPercentage) + '%');
        setFadeOutScrollToTop(true);
        // Hide the button after fade-out animation completes
        setTimeout(() => {
          setShowScrollToTop(false);
          setFadeOutScrollToTop(false);
        }, 500);
      }

      // Handle marques2.gif gradual fade based on scroll position
      const rejoignezElement = document.querySelector('[data-section="rejoignez"]');
      const dansunElement = document.querySelector('[data-section="dansun"]');
      
      if (rejoignezElement && dansunElement) {
        const rejoignezRect = rejoignezElement.getBoundingClientRect();
        const dansunRect = dansunElement.getBoundingClientRect();
        
        // Start fading when we're 70% through the rejoignez section
        const rejoignezHeight = rejoignezRect.height;
        const rejoignezProgress = Math.max(0, (window.innerHeight - rejoignezRect.top) / rejoignezHeight);
        
        if (rejoignezProgress >= 0.7 && dansunRect.top > 0) {
          // Fade out in the last 30% of rejoignez section
          const fadeProgress = (rejoignezProgress - 0.7) / 0.3; // 0 to 1 in last 30%
          const fadeOpacity = Math.max(0, 1 - fadeProgress);
          setMarquesOpacity(fadeOpacity);
        }
        // Ensure it's completely gone when dansun section starts appearing
        else if (dansunRect.top <= window.innerHeight) {
          setMarquesOpacity(0);
        }
        // Keep it visible in early parts of rejoignez
        else if (rejoignezProgress < 0.7) {
          setMarquesOpacity(1);
        }
      }

      // Close video player when scrolling outside film section
      if (showVideoPlayer) {
        const filmElement = document.querySelector('[data-section="film"]');
        if (filmElement) {
          const filmRect = filmElement.getBoundingClientRect();
          // Close video if film section is not visible (completely above or below viewport)
          if (filmRect.bottom < 0 || filmRect.top > window.innerHeight) {
            console.log('Closing video player - scrolled outside film section');
            pauseAllVideos();
          }
        }
      }

      // Block over-scrolling below footer on mobile
      if (isMobile) {
        const footerElement = document.querySelector('footer, [style*="backgroundColor: #0D1B2A"]:last-of-type');
        if (footerElement) {
          const footerRect = footerElement.getBoundingClientRect();
          // If footer is fully visible and user tries to scroll more, prevent it
          if (footerRect.bottom <= window.innerHeight && scrollY >= maxScroll) {
            target.scrollTop = maxScroll;
          }
        }
      }
    };

    if (showMainContent && !showVideoPage && !showRoulettePage && !isNavigatingToSimulator) {
      const scrollableDiv = document.querySelector('.scrollbar-thin');
      if (scrollableDiv) {
        console.log('Adding scroll event listener');
        scrollableDiv.addEventListener('scroll', handleScroll);
        return () => {
          console.log('Removing scroll event listener');
          scrollableDiv.removeEventListener('scroll', handleScroll);
        };
      }
    } else {
      console.log('Not adding scroll event listener:', {
        showMainContent,
        showAProposPage,
        showRoulettePage,
        showVideoPage
      });
    }
  }, [showMainContent, showAProposPage, showRoulettePage, showVideoPage, solutionsVisible, videoPlaceAnimated, showCalculatorPage, calculatorVisible, showScrollToTop, fadeOutScrollToTop]);

  const toggleContactButton = () => {
    pauseAllVideos(); // Stop any playing videos
    setShowContactToast(!showContactToast);
  };

  const openMailClient = () => {
    // Prepare simulation data for email body
    const emailBody = `
RÉSULTATS DE MA SIMULATION :
réalisée le ${new Date().toLocaleDateString('fr-FR')}
💰 Gains potentiels calculés : ${currentDisplayAmount.toLocaleString()}€

📈 DONNÉES DE LA SIMULATION :

🛞 PNEUMATIQUES :
- Nombre de pneus : ${cursor1Moved ? calculatePrice(step1Cursor1, 'step1cursor1') + 'K' : 'N/A'}
- CA : ${cursor2Moved ? calculatePrice(step1Cursor2, 'step1cursor2') + 'K€' : 'N/A'}
- % Manufacturiers : ${[
      michelinChecked ? `Michelin: ${michelinPercent}%` : '',
      continentalChecked ? `Continental: ${continentalPercent}%` : '',
      bridgestoneChecked ? `Bridgestone: ${bridgestonePercent}%` : '',
      pirelliChecked ? `Pirelli: ${pirelliPercent}%` : '',
      dunlopChecked ? `Dunlop: ${dunlopPercent}%` : '',
      autresChecked ? `Autres: ${autresPercent}%` : ''
    ].filter(Boolean).join(', ') || 'N/A'}
- Facturation : ${directChecked ? 'En Direct' : constructorChecked ? 'Constructeur' : 'N/A'}

🎨 PEINTURE :
- CA : ${step3CursorMoved ? calculatePrice(step3Cursor, 'step3cursor') + 'K€' : 'N/A'}
- Facturation : ${step3DirectChecked ? 'En Direct' : step3ConstructorChecked ? 'Constructeur' : 'N/A'}

🚘 PLAQUES MINÉRALOGIQUES :
- Type : ${step4TopLeftChecked && step4TopRightChecked ? 'Plaques standards et spéciales' : 
         step4TopLeftChecked ? 'Plaques standards' : 
         step4TopRightChecked ? 'Plaques spéciales' : 'N/A'}
- Nombre de plaques : ${step4CursorMoved ? calculatePrice(step4Cursor, 'step4cursor') + 'K' : 'N/A'}
- Facturation : ${step4DirectChecked ? 'En Direct' : step4ConstructorChecked ? 'Constructeur' : 'N/A'}

🛢️ LUBRIFIANTS :
- Norme constructeur : ${step6Matrix[0] && step6Matrix[0][0] && step6Matrix[0][0].trim() ? step6Matrix[0][0] : 'N/A'}
- Grade : ${step6Matrix[0] && step6Matrix[0][1] && step6Matrix[0][1].trim() ? step6Matrix[0][1] : 'N/A'}
- Volume : ${step6Matrix[0] && step6Matrix[0][2] && step6Matrix[0][2].trim() ? step6Matrix[0][2] : 'N/A'}
- Conditionnement : ${step6Matrix[0] && step6Matrix[0][3] && step6Matrix[0][3].trim() ? step6Matrix[0][3] : 'N/A'}
- Facturation : ${step5DirectChecked ? 'En Direct' : step5ConstructorChecked ? 'Constructeur' : 'N/A'}

`;

    // Open mail client with prefilled data
    const mailtoLink = `mailto:hippolyte.burtin@performance2002.com?subject=Contact suite à ma simulation PERF&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  // Simple contact function for express menu - opens blank email
  const openBlankContact = () => {
    pauseAllVideos(); // Stop any playing videos
    const mailtoLink = `mailto:hippolyte.burtin@performance2002.com`;
    window.location.href = mailtoLink;
  };

  // Simple navigation function that works from any page
  const navigateToPage = (targetPage: 'main' | 'apropos' | 'roulette' | 'video') => {
    console.log('navigateToPage called with:', targetPage);
    pauseAllVideos(); // Stop any playing videos
    // Close all other pages first
    setShowAProposPage(false);
    setShowRoulettePage(false);
    setShowVideoPage(false);
    setShowMainContent(false);
    
    // Navigate to target page
    if (targetPage === 'main') {
      console.log('Navigating to main page (solutions page)');
      console.log('Current state:', { showMainContent, showAProposPage, showRoulettePage });
      setShowMainContent(true);
      // Reset scroll to top and set all states
      setTimeout(() => {
        const scrollableDiv = document.querySelector('.scrollbar-thin');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = 0;
        }
        // Set all main page states
        setVisibleSections({
          laperfhome: true,
          rejoignez: true,
          dansun: true,
          solutions: true,
          film: true
        });
        setSolutionsVisible(true);
        setSolutionsTextVisible(true);
        setSolutionsIconsVisible(true);
        setSolutionsButtonVisible(true);
        setVideoPlaceAnimated(true);
        setContactButtonVisible(true);
        setMarquesOpacity(1); // Show marques2.gif at top of page
        setShowCalculatorPage(false);
        setCalculatorVisible(false);
        setShowScrollToTop(false);
        
        // Trigger a scroll event to ensure proper scroll state initialization
        setTimeout(() => {
          const scrollableDiv = document.querySelector('.scrollbar-thin');
          if (scrollableDiv) {
            // Dispatch a scroll event to trigger the scroll handler
            scrollableDiv.dispatchEvent(new Event('scroll'));
          }
        }, 100);
      }, 100);
    } else if (targetPage === 'apropos') {
      setShowMainContent(true);
      setShowAProposPage(true);
      // Reset scroll to top for À propos page
      setTimeout(() => {
        const scrollableDiv = document.querySelector('.scrollbar-thin');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = 0;
        }
      }, 100);
    } else if (targetPage === 'roulette') {
      console.log('Navigating to roulette page');
      setShowMainContent(true);
      setShowRoulettePage(true);
      // Reset scroll to top for Roulette page
      setTimeout(() => {
        const scrollableDiv = document.querySelector('.scrollbar-thin');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = 0;
        }
      }, 100);
    } else if (targetPage === 'video') {
      console.log('Navigating to video page');
      setShowMainContent(true);
      setShowVideoPage(true);
    }
  };

  const scrollToSimulator = () => {
    console.log('scrollToSimulator called - direct navigation');
    pauseAllVideos(); // Stop any playing videos
    setIsNavigatingToSimulator(true);
    
    // Close all other pages first
    setShowAProposPage(false);
    setShowRoulettePage(false);
    setShowVideoPage(false);
    setShowMainContent(false);
    
    // Navigate directly to main page and scroll to simulator
    setTimeout(() => {
      setShowMainContent(true);
      // Set all main page states
        setVisibleSections({
          laperfhome: true,
          rejoignez: true,
          dansun: true,
          solutions: true,
          film: true
        });
      setSolutionsVisible(true);
      setSolutionsTextVisible(true);
      setSolutionsIconsVisible(true);
      setSolutionsButtonVisible(true);
      setVideoPlaceAnimated(true);
      setContactButtonVisible(true);
      setMarquesOpacity(1);
      setShowCalculatorPage(false);
      setCalculatorVisible(false);
      setShowScrollToTop(false);

      // Then scroll to simulator (no scroll reset anywhere)
      setTimeout(() => {
        const simulatorElement = document.getElementById('simulator');
        const scrollableDiv = document.querySelector('.scrollbar-thin');
        if (simulatorElement && scrollableDiv) {
          // Calculate the position to center simulator properly on mobile vs desktop
          const elementTop = simulatorElement.offsetTop;
          const offset = isMobile ? 20 : -40; // Small positive offset on mobile to center perfectly
          const scrollTo = elementTop + offset;
          
          scrollableDiv.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
        
        // Manually trigger simulator fade-in since scroll event listener is disabled
        setTimeout(() => {
          setShowCalculatorPage(true);
          setCalculatorVisible(true);
        }, 500);
        
        // Re-enable scroll event listener after navigation completes
        setTimeout(() => {
          setIsNavigatingToSimulator(false);
        }, 1000);
      }, 200);
    }, 100);
  };

  const scrollToVideo = () => {
    console.log('scrollToVideo called - direct navigation');
    pauseAllVideos(); // Stop any playing videos
    setIsNavigatingToSimulator(true);
    
    // Close all other pages first
    setShowAProposPage(false);
    setShowRoulettePage(false);
    setShowMainContent(false);
    
    // Navigate directly to main page and scroll to video section
    setTimeout(() => {
      setShowMainContent(true);
      // Set all main page states
        setVisibleSections({
          laperfhome: true,
          rejoignez: true,
          dansun: true,
          solutions: true,
          film: true
        });
      setSolutionsVisible(true);
      setSolutionsTextVisible(true);
      setSolutionsIconsVisible(true);
      setSolutionsButtonVisible(true);
      setVideoPlaceAnimated(true);
      setContactButtonVisible(true);
      setMarquesOpacity(1);
      setShowCalculatorPage(false);
      setCalculatorVisible(false);
      setShowScrollToTop(false);

      // Then scroll to film section (film full.png area)
      setTimeout(() => {
        const filmElement = document.querySelector('[data-section="film"]');
        const scrollableDiv = document.querySelector('.scrollbar-thin');
        if (filmElement && scrollableDiv) {
          // Calculate the position to scroll to film section
          const elementTop = (filmElement as HTMLElement).offsetTop;
          const scrollTo = elementTop - 100; // Scroll to film section
          
          scrollableDiv.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
        
        // Re-enable scroll event listener after navigation completes
        setTimeout(() => {
          setIsNavigatingToSimulator(false);
        }, 1000);
      }, 200);
    }, 100);
  };

  const scrollToTop = () => {
    pauseAllVideos(); // Stop any playing videos
    const scrollableDiv = document.querySelector('.scrollbar-thin');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Helper function to pause all videos and close video player
  const pauseAllVideos = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (!video.paused) {
        video.pause();
      }
    });
    // Also close the video player
    setShowVideoPlayer(false);
  };

  // Roulette drag handling functions
  const handleColumnDrag = (e: React.MouseEvent | React.TouchEvent, columnIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStart({ y: clientY, column: columnIndex, initialPosition: columnPositions[columnIndex] });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    const deltaY = e.clientY - dragStart.y;
    const newPositions = [...columnPositions];
    
    // Calculate new position - allow unlimited movement during drag
    const newPosition = dragStart.initialPosition + deltaY * 2;
    
    newPositions[dragStart.column] = newPosition;
    setColumnPositions(newPositions);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    const deltaY = e.touches[0].clientY - dragStart.y;
    const newPositions = [...columnPositions];
    
    // Calculate new position - allow unlimited movement during drag
    const newPosition = dragStart.initialPosition + deltaY * 2;
    
    newPositions[dragStart.column] = newPosition;
    setColumnPositions(newPositions);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // No position wrapping needed - truly infinite with dynamic card generation!
  };

  // Add event listeners for drag handling
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, dragStart, columnPositions]);

  // Monitor cursor values and trigger warnings when reaching maximum
  useEffect(() => {
    if (cursor1Moved && calculatePrice(step1Cursor1, 'step1cursor1') === 30) {
      showMaxWarning(1);
    }
  }, [step1Cursor1, cursor1Moved]);

  useEffect(() => {
    if (cursor2Moved && calculatePrice(step1Cursor2, 'step1cursor2') === 9999) {
      showMaxWarning(1);
    }
  }, [step1Cursor2, cursor2Moved]);

  useEffect(() => {
    if (step3CursorMoved && calculatePrice(step3Cursor, 'step3cursor') === 4999) {
      showMaxWarning(3);
    }
  }, [step3Cursor, step3CursorMoved]);

  useEffect(() => {
    if (step4CursorMoved && calculatePrice(step4Cursor, 'step4cursor') === 100) {
      showMaxWarning(4);
    }
  }, [step4Cursor, step4CursorMoved]);

  // No need for complex position reset logic - we'll handle infinite scroll with the helper function

  if (!showMainContent) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0D1B2A' }}>
        {/* Animated Landing Sequence with Responsive GIF */}
        <div className="text-center">
          <img 
            src={`${isMobile ? "/assets/gifs/WEBMOBPERF.gif" : "/assets/gifs/WEB-FERF.gif"}?t=${gifKey}`}
            alt="PERF Intro Animation"
            className="max-w-full h-auto"
            key={`intro-gif-${gifKey}`} // Force re-render to restart GIF animation
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0D1B2A' }}>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
          headerSlideIn ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ backgroundColor: '#0D1B2A' }}
      >
        <div className="px-6 flex justify-between items-center" style={{ paddingTop: '18px', paddingBottom: '18px' }}>
          <div className="flex items-center space-x-8">
            <img 
              src="/assets/header/logoPERF header.png" 
              alt="PERF Logo" 
              className="h-[24px] md:h-[28px] cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                 // Navigate directly to main page, bypassing intro GIF
                 console.log('PERF logo clicked - navigating to main page');
                 pauseAllVideos(); // Stop any playing videos
                 
                 // Reset all page states
                 setShowAProposPage(false);
                 setShowRoulettePage(false);
                 setShowVideoPage(false);
                 
                 // Set main content to show immediately (bypass intro)
                 setShowMainContent(true);
                 
                 // Set initial sections visible (matching scroll position 0)
                 // Let Intersection Observer handle the rest as user scrolls
                 setVisibleSections({
                   laperfhome: true,
                   rejoignez: true,
                   dansun: true,
                   solutions: false,
                   film: false
                 });
                 
                 // Reset scroll to top immediately and reliably
                 const scrollableDiv = document.querySelector('.scrollbar-thin');
                 if (scrollableDiv) {
                   scrollableDiv.scrollTop = 0;
                   // Force scroll to top with smooth behavior as backup
                   scrollableDiv.scrollTo({ top: 0, behavior: 'auto' });
                 }
                 
                 // Also reset window scroll as backup
                 window.scrollTo(0, 0);
                 
                 // Reset other main page states
                 setTimeout(() => {
                   // Set marques opacity to show at top of page (laperfhome section)
                   setMarquesOpacity(1);
                   setShowCalculatorPage(false);
                   setCalculatorVisible(false);
                   setShowScrollToTop(false);
                   setSolutionsVisible(false);
                   setSolutionsTextVisible(false);
                   setSolutionsIconsVisible(false);
                   setSolutionsButtonVisible(false);
                   setVideoPlaceAnimated(true);
                   setContactButtonVisible(false);
                   
                   // Double-check scroll reset after state changes
                   const scrollableDivCheck = document.querySelector('.scrollbar-thin');
                   if (scrollableDivCheck) {
                     scrollableDivCheck.scrollTop = 0;
                     
                     // Trigger a scroll event to ensure proper scroll state initialization
                     // This will update marques.gif visibility and other scroll-dependent states
                     scrollableDivCheck.dispatchEvent(new Event('scroll'));
                   }
                 }, 100);
                }}
            />
          </div>
        <div className="flex items-center space-x-4 -ml-4">
            <img 
              src="/assets/header/la perf_header.png" 
              alt="LA PERFORMANCE DEPUIS 2002" 
              className="h-[8px] md:h-[10px]"
            />
            {/* Mobile: Red square button */}
            <a 
              href="https://app.performance2002.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="md:hidden"
            >
              <div className="w-6 h-6 bg-red-600 flex items-center justify-center rounded-sm cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-white font-normal text-sm font-montserrat">A</span>
              </div>
            </a>
            
            {/* Desktop: Original button */}
            <a 
              href="https://app.performance2002.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block relative cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src="/assets/header/cta adherent.png" 
                alt="Button Background" 
                className="h-5 w-auto"
              />
              <img 
                src="/assets/header/ADHERENT.png" 
                alt="ADHÉRENT" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px]"
              />
            </a>
          </div>
        </div>
        {/* Yellow separator line */}
        <div className="w-full h-px" style={{ backgroundColor: '#FFC300' }}></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative min-h-screen pt-20">
        {showVideoPage ? (
          /* Video Page */
          <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#0D1B2A' }}>
            {/* Video Player - responsive design */}
            <div className="h-screen flex items-center justify-center relative px-4 md:px-8">
              <div className="relative w-full max-w-3xl h-auto aspect-video max-h-[60vh]">
                {showVideoPlayer ? (
                  /* Video Player */
                  <div className="relative w-full h-full">
                    <video 
                      className="w-full h-full object-contain rounded-lg"
                      controls
                      autoPlay
                      loop
                    >
                      <source src="/video/WhatsApp Vidéo 2025-09-12 à 20.38.15_00b6618f.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Close button */}
                    <button 
                      className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
                      onClick={() => setShowVideoPlayer(false)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Film Full Image */
                  <div className="cursor-pointer w-full h-full flex items-center justify-center" onClick={() => setShowVideoPlayer(true)}>
                    <img 
                      src="/video/film.png" 
                      alt="Video Place" 
                      className={`w-full h-auto max-h-full object-contain hover:opacity-80 transition-all duration-1000 ease-out ${
                        filmImageSlideIn 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-full opacity-0'
                      }`}
                    />
                  </div>
                )}
              </div>
              
              {/* Close button */}
              <button
                onClick={() => navigateToPage('main')}
                className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : showRoulettePage ? (
          /* Roulette Page */
          <div className="absolute inset-0 w-full h-full">
            {/* Fixed Background */}
            <img 
              src="/roulette/BACK home solutions.png" 
              alt="Roulette Background" 
              className="w-full h-full object-cover"
            />
            
            {/* Scrollable Content */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent">
              {/* Roulette content */}
              <div className="h-screen flex items-center justify-center relative">
                {/* SOLUTIONS.png - positioned safely within viewport */}
                <div className="absolute left-4 md:left-8 z-10 transition-all duration-1000 delay-500" style={{ 
                  top: 'calc(50% + 250px)',
                  maxWidth: 'calc(100vw - 4rem)',
                  right: '2rem'
                }}>
                  <img 
                    src="/roulette/HOME SOLUTIONS/SOLUTIONS.png" 
                    alt="Solutions" 
                    className="h-4 md:h-6 w-auto max-w-full object-contain"
                    style={{ maxHeight: '2rem' }}
                  />
                </div>
                
                {/* Central content - intro txt.png */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 delay-300" style={{ top: '50%' }}>
                  <div className="flex flex-col items-center">
                    {/* intro txt.png content */}
                    <img 
                      src="/roulette/HOME SOLUTIONS/intro txt.png" 
                      alt="PERF Solutions" 
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                    
                    {/* Simulateur Button - positioned under intro txt.png, aligned to the right */}
                    <div className="relative self-end cursor-pointer group transition-all duration-1000 delay-700 -mt-2" onClick={scrollToSimulator}>
                      <img 
                        src="/roulette/HOME SOLUTIONS/cta.png" 
                        alt="Button Background" 
                        className="h-auto max-w-20 md:max-w-28"
                      />
                      <img 
                        src="/roulette/HOME SOLUTIONS/SIMULATEUR.png" 
                        alt="SIMULATEUR" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-16 md:max-w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Roulette Slot Machine Section */}
              <div className="h-auto md:h-[85vh] flex items-center justify-center relative py-8 md:py-0">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
                  {/* Slot Machine Reels - Cropped like real slot machine */}
                  <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 relative">
                    {/* Column 1 - PNEUMATIQUES */}
                    <div 
                      className="relative w-[360px] md:w-[320px] h-[550px] md:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden border-2 border-yellow-400 border-opacity-30 rounded-lg shadow-lg hover:border-opacity-60 hover:shadow-xl transition-all duration-300"
                      onMouseDown={(e) => handleColumnDrag(e, 0)}
                      onTouchStart={(e) => handleColumnDrag(e, 0)}
                      onWheel={(e) => e.preventDefault()}
                    >
                      <div className="absolute inset-0 flex flex-col transition-transform duration-300 ease-out" style={{ 
                        transform: `translateY(${columnPositions[0]}px)` 
                      }}>
                        {(() => {
                          const cardHeight = isMobile ? 550 : 500;
                          const position = columnPositions[0];
                          const visibleStart = Math.floor(-position / cardHeight) - 2; // Start 2 cards before visible area
                          const visibleEnd = visibleStart + 10; // Show 10 cards total
                          
                          return Array.from({ length: visibleEnd - visibleStart }, (_, i) => {
                            const cardIndex = (visibleStart + i) % 6;
                            const normalizedIndex = ((cardIndex % 6) + 6) % 6; // Handle negative modulo
                            const yPosition = (visibleStart + i) * cardHeight;
                            
                            return (
                              <img 
                                key={`col1-${visibleStart + i}`}
                                src={rouletteImages[normalizedIndex]} 
                                alt={`Roulette ${normalizedIndex + 1}`} 
                                className="w-full h-[550px] md:h-[500px] object-cover flex-shrink-0 absolute"
                                style={{ top: `${yPosition}px` }}
                              />
                            );
                          });
                        })()}
                      </div>
                    </div>
                    
                    {/* Column 2 - PEINTURE */}
                    <div 
                      className="relative w-[360px] md:w-[320px] h-[550px] md:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden border-2 border-yellow-400 border-opacity-30 rounded-lg shadow-lg hover:border-opacity-60 hover:shadow-xl transition-all duration-300 hidden md:block"
                      onMouseDown={(e) => handleColumnDrag(e, 1)}
                      onTouchStart={(e) => handleColumnDrag(e, 1)}
                      onWheel={(e) => e.preventDefault()}
                    >
                      <div className="absolute inset-0 flex flex-col transition-transform duration-300 ease-out" style={{ 
                        transform: `translateY(${columnPositions[1]}px)` 
                      }}>
                        {(() => {
                          const cardHeight = isMobile ? 550 : 500;
                          const position = columnPositions[1];
                          const visibleStart = Math.floor(-position / cardHeight) - 2; // Start 2 cards before visible area
                          const visibleEnd = visibleStart + 10; // Show 10 cards total
                          
                          return Array.from({ length: visibleEnd - visibleStart }, (_, i) => {
                            const cardIndex = (visibleStart + i) % 6;
                            const normalizedIndex = ((cardIndex % 6) + 6) % 6; // Handle negative modulo
                            const yPosition = (visibleStart + i) * cardHeight;
                            
                            return (
                              <img 
                                key={`col2-${visibleStart + i}`}
                                src={rouletteImages[normalizedIndex]} 
                                alt={`Roulette ${normalizedIndex + 1}`} 
                                className="w-full h-[550px] md:h-[500px] object-cover flex-shrink-0 absolute"
                                style={{ top: `${yPosition}px` }}
                              />
                            );
                          });
                        })()}
                      </div>
                    </div>
                    
                    {/* Column 3 - LUBRIFIANTS */}
                    <div 
                      className="relative w-[360px] md:w-[320px] h-[550px] md:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden border-2 border-yellow-400 border-opacity-30 rounded-lg shadow-lg hover:border-opacity-60 hover:shadow-xl transition-all duration-300 hidden md:block"
                      onMouseDown={(e) => handleColumnDrag(e, 2)}
                      onTouchStart={(e) => handleColumnDrag(e, 2)}
                      onWheel={(e) => e.preventDefault()}
                    >
                      <div className="absolute inset-0 flex flex-col transition-transform duration-300 ease-out" style={{ 
                        transform: `translateY(${columnPositions[2]}px)` 
                      }}>
                        {(() => {
                          const cardHeight = isMobile ? 550 : 500;
                          const position = columnPositions[2];
                          const visibleStart = Math.floor(-position / cardHeight) - 2; // Start 2 cards before visible area
                          const visibleEnd = visibleStart + 10; // Show 10 cards total
                          
                          return Array.from({ length: visibleEnd - visibleStart }, (_, i) => {
                            const cardIndex = (visibleStart + i) % 6;
                            const normalizedIndex = ((cardIndex % 6) + 6) % 6; // Handle negative modulo
                            const yPosition = (visibleStart + i) * cardHeight;
                            
                            return (
                              <img 
                                key={`col3-${visibleStart + i}`}
                                src={rouletteImages[normalizedIndex]} 
                                alt={`Roulette ${normalizedIndex + 1}`} 
                                className="w-full h-[550px] md:h-[500px] object-cover flex-shrink-0 absolute"
                                style={{ top: `${yPosition}px` }}
                              />
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer - Hidden on mobile for Apropos page */}
              <div className="relative hidden md:block" style={{ backgroundColor: '#0D1B2A' }}>
                {/* Golden top border */}
                <div className="w-full h-px" style={{ backgroundColor: '#FFC300' }}></div>
                
                {/* Footer content */}
                <div className="py-2 px-6 relative" style={{ backgroundColor: 'transparent' }}>
                  {/* Footer content in one line */}
                  <div className="flex justify-between items-center">
                    {/* Copyright - Left aligned on mobile, centered on desktop */}
                    <div className="flex-1 flex justify-start md:justify-center">
                      <img 
                        src="/footer/PERF2025.png" 
                        alt="© PERF 2025" 
                        className="h-3 w-auto"
                      />
                    </div>
                    
                    {/* Website powered by - Right aligned */}
                    <div className="flex items-center">
                      <img 
                        src="/footer/website powered by.png" 
                        alt="Website powered by" 
                        className="h-2 w-auto mr-2"
                      />
                      <a 
                        href="https://www.okfred.biz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src="/footer/logo-OKFRED.png" 
                          alt="OKFRED Logo" 
                          className="h-4 w-auto"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Light grey bottom border */}
                <div className="w-full h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        ) : showAProposPage ? (
          /* A Propos Page */
          <div className="absolute inset-0 w-full h-full">
            {/* Fixed Background */}
            <img 
              src="/deroulant/ARRIERE PLAN  perf_.png" 
              alt="A Propos Background" 
              className="w-full h-full object-cover"
            />
            
            {/* Scrollable Content */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent">
              {/* Page 0 - Nos Valeurs */}
              <div className="h-screen flex items-center justify-center relative" data-apropos-section="nosValeurs">
                {/* ADN bleu.png - positioned at left edge */}
                <div className={`absolute left-8 z-10 transition-all duration-500 delay-300 ${aproposSectionsVisible.nosValeurs ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ top: 'calc(50% + 150px)' }}>
                  <img 
                    src="/deroulant/ADN bleu.png" 
                    alt="ADN Bleu" 
                    className="h-32 w-auto"
                  />
                </div>
                
                {/* Central text - home _ nos valeurs.png */}
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
                  aproposSectionsVisible.nosValeurs 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/deroulant/home _ nos valeurs.png" 
                      alt="Nos Valeurs" 
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                  </div>
                </div>
              </div>
              
              {/* Page 1 - Partenariat */}
              <div className="h-screen flex items-center justify-center relative" data-apropos-section="partenariat">
                {/* bluepartenariat.png - positioned at left edge */}
                <div className={`absolute left-8 z-10 transition-all duration-500 delay-300 ${aproposSectionsVisible.partenariat ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ top: 'calc(50% + 220px)' }}>
                  <img 
                    src="/assets/Apropos/bluepartenariat.png" 
                    alt="Blue Partenariat" 
                    className="h-6 w-auto"
                  />
                </div>
                
                {/* Central text - PARTENARIAT.png */}
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
                  aproposSectionsVisible.partenariat 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/deroulant/PARTENARIAT.png" 
                      alt="Partenariat" 
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                  </div>
                </div>
              </div>
              
              {/* Page 2 - Expertise */}
              <div className="h-screen flex items-center justify-center relative" data-apropos-section="expertise">
                {/* blueexpertise.png - positioned at left edge */}
                <div className={`absolute left-8 z-10 transition-all duration-500 delay-300 ${aproposSectionsVisible.expertise ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ top: 'calc(50% + 220px)' }}>
                  <img 
                    src="/assets/Apropos/blueexpertise.png" 
                    alt="Blue Expertise" 
                    className="h-6 w-auto"
                  />
                </div>
                
                {/* Central text - expertise.png */}
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
                  aproposSectionsVisible.expertise 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/deroulant/expertise.png" 
                      alt="Expertise" 
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                  </div>
                </div>
              </div>
              
              {/* Page 3 - Rentabilité */}
              <div className="h-screen flex items-center justify-center relative" data-apropos-section="rentabilite">
                {/* bluerentabilite.png - positioned at left edge */}
                <div className={`absolute left-8 z-10 transition-all duration-500 delay-300 ${aproposSectionsVisible.rentabilite ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ top: 'calc(50% + 220px)' }}>
                  <img 
                    src="/assets/Apropos/bluerentabilite.png" 
                    alt="Blue Rentabilité" 
                    className="h-8 w-auto"
                  />
                </div>
                
                {/* Central text - rentabilit.png */}
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
                  aproposSectionsVisible.rentabilite 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <div className="flex flex-col items-center">
                    <img 
                      src="/assets/Apropos/rentabilit.png" 
                      alt="Rentabilité" 
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                  </div>
                </div>
              </div>
              
              {/* Page 4 - Fiabilité */}
              <div className="h-screen flex items-center justify-center relative" data-apropos-section="fiabilite">
                {/* bluefiabilite.png - positioned at left edge */}
                <div className={`absolute left-8 z-10 transition-all duration-500 delay-300 ${aproposSectionsVisible.fiabilite ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ top: 'calc(50% + 220px)' }}>
                  <img 
                    src="/assets/Apropos/bluefiabilite.png" 
                    alt="Blue Fiabilité" 
                    className="h-8 w-auto"
                  />
                </div>
                
                {/* Main content - fiabilite.png with button underneath aligned to fiabilite edge */}
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
                  aproposSectionsVisible.fiabilite 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <div className="flex flex-col items-center">
                    {/* fiabilite.png content */}
                    <img
                      src="/assets/Apropos/fiabilite.png"
                      alt="Fiabilité"
                      className="max-w-xs md:max-w-md h-auto mb-6"
                    />
                    
                    {/* SOLUTIONS Button - positioned under fiabilite.png, aligned to the right */}
                    <div className="relative self-end cursor-pointer" onClick={() => {
                      setShowAProposPage(false);
                      setShowRoulettePage(true);
                      // Reset scroll to top for Roulette page
                      setTimeout(() => {
                        const scrollableDiv = document.querySelector('.scrollbar-thin');
                        if (scrollableDiv) {
                          scrollableDiv.scrollTop = 0;
                        }
                      }, 100);
                    }}>
                      <img 
                        src="/deroulant/cta solutions.png" 
                        alt="Button Background" 
                        className="h-auto max-w-24 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <img 
                        src="/deroulant/SOLUTIONS.png" 
                        alt="SOLUTIONS" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer - Hidden on mobile for Apropos page */}
              <div className="relative hidden md:block" style={{ backgroundColor: '#0D1B2A' }}>
                {/* Golden top border */}
                <div className="w-full h-px" style={{ backgroundColor: '#FFC300' }}></div>
                
                {/* Footer content */}
                <div className="py-2 px-6 relative" style={{ backgroundColor: 'transparent' }}>
                  {/* Footer content in one line */}
                  <div className="flex justify-between items-center">
                    {/* Copyright - Left aligned on mobile, centered on desktop */}
                    <div className="flex-1 flex justify-start md:justify-center">
                      <img 
                        src="/footer/PERF2025.png" 
                        alt="© PERF 2025" 
                        className="h-3 w-auto"
                      />
                    </div>
                    
                    {/* Website powered by - Right aligned */}
                    <div className="flex items-center">
                      <img 
                        src="/footer/website powered by.png" 
                        alt="Website powered by" 
                        className="h-2 w-auto mr-2"
                      />
                      <a 
                        href="https://www.okfred.biz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src="/footer/logo-OKFRED.png" 
                          alt="OKFRED Logo" 
                          className="h-4 w-auto"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Light grey bottom border */}
                <div className="w-full h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Scrollable content area */
          <div className={`h-screen overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent transition-all duration-1000 opacity-100`}>
          {/* First section - laperfhome */}
          <div className="h-screen flex items-center justify-center" data-section="laperfhome">
            <div className={`text-center transition-all duration-1000 ${
              visibleSections.laperfhome 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
            <img
              src="/deroulant/laperfhome.png"
              alt="LA PERFORMANCE DEPUIS 2002"
              className="max-w-xs md:max-w-xl h-auto -mt-20"
            />
            </div>
          </div>
          
          {/* Second section - rejoignez */}
          <div className="h-screen flex items-center justify-center relative z-20" data-section="rejoignez">
            {/* Main content - rejoignez.png with button underneath aligned to rejoignez edge */}
            <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
              visibleSections.rejoignez 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="flex flex-col items-center">
                {/* rejoignez.png content */}
                <img
                  src="/deroulant/rejoignez.png"
                  alt="Rejoignez"
                  className="max-w-xs md:max-w-md h-auto mb-6"
                />
                
                {/* SOLUTIONS Button - positioned under rejoignez.png, aligned to the right */}
                <div className="relative self-end cursor-pointer" onClick={() => {
                  setShowAProposPage(false);
                  setShowRoulettePage(true);
                }}>
                  <img 
                    src="/deroulant/cta solutions.png" 
                    alt="Button Background" 
                    className="h-auto max-w-20 md:max-w-24 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <img 
                    src="/deroulant/SOLUTIONS.png" 
                    alt="SOLUTIONS" 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-16 md:max-w-20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Third section - dansun with ADN on left */}
          <div className="h-screen flex items-center justify-center relative" data-section="dansun">
            {/* ADN.png - positioned at left edge, below dansun */}
            <div className={`absolute left-8 z-10 transition-all duration-1000 delay-300 ${
              visibleSections.dansun 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`} style={{ top: 'calc(50% + 180px)' }}>
              <img 
                src="/deroulant/ADN.png" 
                alt="ADN" 
                className="h-24 md:h-32 w-auto"
              />
            </div>
            {/* Main content - dansun.png with button underneath aligned to dansun edge */}
            <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${
              visibleSections.dansun 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="flex flex-col items-center">
                {/* dansun.png content */}
                <img
                  src="/deroulant/dansun.png"
                  alt="Dansun"
                  className="max-w-xs md:max-w-md h-auto mb-6"
                />
                
                {/* EN SAVOIR PLUS Button - positioned under dansun.png, aligned to the right */}
                <div className="relative self-end cursor-pointer" onClick={() => setShowAProposPage(true)}>
                  <img 
                    src="/deroulant/ensavoirbutton.png" 
                    alt="Button Background" 
                    className="h-auto max-w-24 md:max-w-32"
                  />
                  <img 
                    src="/deroulant/EN SAVOIR PLUS.png" 
                    alt="EN SAVOIR PLUS" 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-20 md:max-w-28"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Place Section - now part of the main scroll */}
          <div className="h-screen flex items-center justify-center relative px-4 md:px-8" data-section="film" style={{ backgroundColor: '#0D1B2A' }}>
            <div className="relative w-full max-w-3xl h-auto aspect-video max-h-[60vh]">
              {showVideoPlayer ? (
                /* Video Player */
                <div className="relative w-full h-full">
                  <video 
                    className="w-full h-full object-contain rounded-lg"
                    controls
                    autoPlay
                    loop
                  >
                    <source src="/video/WhatsApp Vidéo 2025-09-12 à 20.38.15_00b6618f.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Close button */}
                  <button
                    onClick={() => setShowVideoPlayer(false)}
                    className="absolute top-2 right-2 z-10 bg-gray-800 hover:bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                /* Film Full Image */
                <div className="cursor-pointer w-full h-full flex items-center justify-center" onClick={() => setShowVideoPlayer(true)}>
                  <img 
                    src="/video/film.png" 
                    alt="Video Place" 
                    className={`w-full h-auto max-h-full object-contain hover:opacity-80 transition-all duration-1000 ease-out ${
                      visibleSections.film 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-full opacity-0'
                    }`}
                  />
                </div>
              )}
            </div>
            
          </div>
          
          {/* Solutions Page - now part of the main scroll */}
          <div className="h-[100vh] md:h-screen relative" data-section="solutions" style={{ backgroundColor: '#0D1B2A' }}>
            {/* Full Solutions Image */}
            {/* Mobile version */}
            <img 
              src="/SOLUTIONS/home solutions mobile.png" 
              alt="Solutions Full" 
              className={`md:hidden absolute top-0 left-0 w-full h-full object-contain transition-all duration-1000 ${
                solutionsTextVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            />
            {/* Desktop version */}
            <img 
              src="/SOLUTIONS/soluce full web.png" 
              alt="Solutions Full" 
              className={`hidden md:block absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${
                solutionsTextVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh'
              }}
            />
            
            {/* EN SAVOIR PLUS Button - positioned like in dansun section */}
            <div className={`absolute bottom-4 right-8 md:bottom-8 md:right-40 transition-all duration-1000 delay-700 ${
              solutionsTextVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="relative cursor-pointer group" onClick={() => {
                setShowAProposPage(false);
                setShowRoulettePage(true);
                // Reset scroll to top for Roulette page
                setTimeout(() => {
                  const scrollableDiv = document.querySelector('.scrollbar-thin');
                  if (scrollableDiv) {
                    scrollableDiv.scrollTop = 0;
                  }
                }, 100);
              }}>
                <img 
                  src="/deroulant/ensavoirbutton.png" 
                  alt="Button Background" 
                  className="h-auto max-w-24 md:max-w-32"
                />
                <img 
                  src="/deroulant/EN SAVOIR PLUS.png" 
                  alt="EN SAVOIR PLUS" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-20 md:max-w-28"
                />
              </div>
            </div>
          </div>
          
          {/* Simulator Page with Flip Effect */}
          <div 
            id="simulator" 
            className="h-screen flex items-center justify-center relative overflow-hidden"
            style={{ 
              backgroundColor: '#0D1B2A',
              contain: 'layout style paint',
              willChange: 'transform'
            }}
          >
            <div className="flip-container overflow-hidden">
              <div className={`flip-card ${showSimuForm ? 'flipped' : ''}`} style={{ overflow: 'hidden' }}>
                
                {/* Front Side - Original Simulator */}
                <div className="flip-card-front">
                  <div className="relative">
                    <img 
                      src="/simu/SIMU CALCULEZ/SIMU CALCULEZ.png" 
                      alt="SIMU CALCULEZ" 
                      className="max-w-sm max-h-full object-contain"
                    />
                    
                    {/* Cursor Slider */}
                    <div 
                      className="absolute w-56"
                      style={{ 
                        bottom: '30%', 
                        left: '40%', 
                        transform: 'translateX(-50%)',
                        zIndex: 50000
                      }}
                    >
                      <div 
                        className="slider-track relative h-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                          WebkitTouchCallout: 'none',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const percentage = (x / rect.width) * 100;
                          const newValue = Math.max(0, Math.min(100, percentage));
                          setSliderValue(newValue);
                        }}
                      >
                        <div 
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ 
                            width: `${sliderValue}%`,
                            backgroundColor: '#FF0000',
                            transition: 'none',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                            pointerEvents: 'none'
                          }}
                        ></div>
                        
                        <div 
                          className="slider-cursor absolute rounded-full cursor-grab hover:cursor-grabbing hover:scale-110 shadow-lg"
                          style={{ 
                            width: '20px',
                            height: '20px',
                            top: '50%',
                            left: `${sliderValue}%`,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#FF0000',
                            zIndex: 99999,
                            transition: 'transform 0.1s ease',
                            border: '2px solid #FF0000',
                            boxShadow: '0 2px 6px rgba(255, 0, 0, 0.3)',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none'
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            document.body.style.cursor = 'grabbing';
                            
                            const handleMouseMove = (e: MouseEvent) => {
                              const sliderTrack = document.querySelector('.slider-track') as HTMLElement;
                              if (sliderTrack) {
                                const rect = sliderTrack.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = (x / rect.width) * 100;
                                const newValue = Math.max(0, Math.min(100, percentage));
                                setSliderValue(newValue);
                              }
                            };
                            
                            const handleMouseUp = () => {
                              document.body.style.cursor = '';
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };
                            
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                        ></div>
                      </div>
                      
                      <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: 'calc(100% + 20px)' }}>
                        <span className="text-white text-lg md:text-xl font-bold">
                          xxxK€
                        </span>
                      </div>
                    </div>

                    <div 
                      className="absolute cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      style={{ 
                        bottom: '14%', 
                        left: '50%', 
                        transform: 'translateX(-50%) scale(1.5)' 
                      }}
                      onClick={openSimuForm}
                    >
                      <div className="relative">
                        <img
                          src="/simu/SIMU CALCULEZ/CTA CALCUL.png"
                          alt="Button Background"
                          className="h-24 object-contain"
                        />
                        <img
                          src="/simu/CALCULEZ VOS GAINS.png"
                          alt="CALCULEZ VOS GAINS"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side - Multi-Step Form */}
                <div className="flip-card-back">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {(() => {
                      console.log('🔄 Flip card back rendering - showSimuForm:', showSimuForm, 'currentSimuStep:', currentSimuStep);
                      return null;
                    })()}
                    {currentSimuStep <= 6 ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {(() => {
                          console.log('🖼️ Rendering step content for currentSimuStep:', currentSimuStep);
                          console.log('🖼️ Step image path:', simuSteps[currentSimuStep - 1]?.image);
                          return null;
                        })()}
                        {/* Step Image with interactive elements */}
                        <div className="relative">
                          <img
                            src={simuSteps[currentSimuStep - 1]?.image}
                            alt={`Simulator Step ${currentSimuStep}`}
                            className={`max-w-sm max-h-full object-contain transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}
                            onLoad={() => console.log('📷 Step image loaded:', simuSteps[currentSimuStep - 1]?.image)}
                            onError={() => console.log('❌ Step image failed to load:', simuSteps[currentSimuStep - 1]?.image)}
                          />

                          {/* Step 1 - Cursors and checkboxes */}
                          {currentSimuStep === 1 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* First Cursor - Volume */}
                              <div 
                                className="absolute w-56 transition-all duration-500"
                                style={{ 
                                  bottom: '35%', 
                                  left: '40%', 
                                  transform: 'translateX(-50%)',
                                  zIndex: 50000
                                }}
                              >
                                <div 
                                  className="slider-track relative h-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                                  style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    MozUserSelect: 'none',
                                    msUserSelect: 'none',
                                    WebkitTouchCallout: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                  }}
                                  onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = (x / rect.width) * 100;
                                    const newValue = Math.max(0, Math.min(100, percentage));
                                    setStep1Cursor1(newValue);
                                    setCursor1Moved(true);
                                    setShowStep1CursorValidationError(false);
                                  }}
                                >
                                  {/* Red filled portion */}
                                  <div 
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{ 
                                      width: `${step1Cursor1}%`,
                                      backgroundColor: cursor1Moved ? '#FFC300' : '#FF0000',
                                      transition: 'none',
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      msUserSelect: 'none',
                                      pointerEvents: 'none'
                                    }}
                                  ></div>
                                  
                                  {/* Red circular handle */}
                                  <div 
                                    className="slider-cursor absolute rounded-full cursor-grab hover:cursor-grabbing hover:scale-110 shadow-lg"
                                    style={{ 
                                      width: '20px',
                                      height: '20px',
                                      top: '50%',
                                      left: `${step1Cursor1}%`,
                                      transform: 'translate(-50%, -50%)',
                                      backgroundColor: cursor1Moved ? '#FFC300' : '#FF0000',
                                      zIndex: 100,
                                      transition: 'transform 0.1s ease',
                                      border: `2px solid ${cursor1Moved ? '#FFC300' : '#FF0000'}`,
                                      boxShadow: `0 2px 6px rgba(${cursor1Moved ? '255, 195, 0' : '255, 0, 0'}, 0.3)`,
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      pointerEvents: 'auto',
                                      cursor: 'grab'
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setCursor1Moved(true);
                                      setShowStep1CursorValidationError(false);
                                      
                                      document.body.style.cursor = 'grabbing';
                                      
                                      const handleMouseMove = (e: MouseEvent) => {
                                        const sliderTrack = document.querySelectorAll('.slider-track')[1] as HTMLElement;
                                        if (sliderTrack) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep1Cursor1(newValue);
                                        }
                                      };
                                      
                                      const handleMouseUp = () => {
                                        document.body.style.cursor = '';
                                        document.removeEventListener('mousemove', handleMouseMove);
                                        document.removeEventListener('mouseup', handleMouseUp);
                                      };
                                      
                                      document.addEventListener('mousemove', handleMouseMove);
                                      document.addEventListener('mouseup', handleMouseUp);
                                    }}
                                    onTouchStart={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setCursor1Moved(true);
                                      setShowStep1CursorValidationError(false);
                                      
                                      const handleTouchMove = (e: TouchEvent) => {
                                        const sliderTrack = document.querySelectorAll('.slider-track')[1] as HTMLElement;
                                        if (sliderTrack && e.touches.length > 0) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.touches[0].clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep1Cursor1(newValue);
                                        }
                                      };
                                      
                                      const handleTouchEnd = () => {
                                        document.removeEventListener('touchmove', handleTouchMove);
                                        document.removeEventListener('touchend', handleTouchEnd);
                                      };
                                      
                                      document.addEventListener('touchmove', handleTouchMove);
                                      document.addEventListener('touchend', handleTouchEnd);
                                    }}
                                  ></div>
                                </div>
                                
                                {/* Value Display */}
                                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: 'calc(100% + 20px)' }}>
                                  {isManualInput1 ? (
                                    <input
                                      type="number"
                                      value={manualInput1Value}
                                      onChange={(e) => setManualInput1Value(e.target.value)}
                                      onBlur={() => {
                                        handleManualInput('step1cursor1', manualInput1Value);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleManualInput('step1cursor1', manualInput1Value);
                                        } else if (e.key === 'Escape') {
                                          setIsManualInput1(false);
                                        }
                                      }}
                                      autoFocus
                                      className="bg-transparent text-white text-lg md:text-xl font-bold border-b border-white outline-none w-16 text-center"
                                      placeholder="0"
                                      min="0"
                                      max="30"
                                    />
                                  ) : (
                                    <span 
                                      className="text-white text-lg md:text-xl font-bold cursor-pointer hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded transition-colors"
                                      onClick={() => handleValueClick('step1cursor1')}
                                      title="Click to edit value"
                                    >
                                      {cursor1Moved ? `${calculatePrice(step1Cursor1, 'step1cursor1')}K` : 'xxxK'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Second Cursor - Revenue */}
                              <div 
                                className="absolute w-56 transition-all duration-500"
                                style={{ 
                                  bottom: '30%', 
                                  left: '40%', 
                                  transform: 'translateX(-50%)',
                                  zIndex: 50000
                                }}
                              >
                                <div 
                                  className="slider-track relative h-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                                  style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    MozUserSelect: 'none',
                                    msUserSelect: 'none',
                                    WebkitTouchCallout: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                  }}
                                  onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = (x / rect.width) * 100;
                                    const newValue = Math.max(0, Math.min(100, percentage));
                                    setStep1Cursor2(newValue);
                                    setCursor2Moved(true);
                                    setShowStep1CursorValidationError(false);
                                  }}
                                >
                                  {/* Red filled portion */}
                                  <div 
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{ 
                                      width: `${step1Cursor2}%`,
                                      backgroundColor: cursor2Moved ? '#FFC300' : '#FF0000',
                                      transition: 'none',
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      msUserSelect: 'none',
                                      pointerEvents: 'none'
                                    }}
                                  ></div>
                                  
                                  {/* Red circular handle */}
                                  <div 
                                    className="slider-cursor absolute rounded-full cursor-grab hover:cursor-grabbing hover:scale-110 shadow-lg"
                                    style={{ 
                                      width: '20px',
                                      height: '20px',
                                      top: '50%',
                                      left: `${step1Cursor2}%`,
                                      transform: 'translate(-50%, -50%)',
                                      backgroundColor: cursor2Moved ? '#FFC300' : '#FF0000',
                                      zIndex: 100,
                                      transition: 'transform 0.1s ease',
                                      border: `2px solid ${cursor2Moved ? '#FFC300' : '#FF0000'}`,
                                      boxShadow: `0 2px 6px rgba(${cursor2Moved ? '255, 195, 0' : '255, 0, 0'}, 0.3)`,
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      pointerEvents: 'auto',
                                      cursor: 'grab'
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setCursor2Moved(true);
                                      setShowStep1CursorValidationError(false);
                                      
                                      document.body.style.cursor = 'grabbing';
                                      
                                      const handleMouseMove = (e: MouseEvent) => {
                                        const sliderTrack = document.querySelectorAll('.slider-track')[2] as HTMLElement;
                                        if (sliderTrack) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep1Cursor2(newValue);
                                        }
                                      };
                                      
                                      const handleMouseUp = () => {
                                        document.body.style.cursor = '';
                                        document.removeEventListener('mousemove', handleMouseMove);
                                        document.removeEventListener('mouseup', handleMouseUp);
                                      };
                                      
                                      document.addEventListener('mousemove', handleMouseMove);
                                      document.addEventListener('mouseup', handleMouseUp);
                                    }}
                                    onTouchStart={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setCursor2Moved(true);
                                      setShowStep1CursorValidationError(false);
                                      
                                      const handleTouchMove = (e: TouchEvent) => {
                                        const sliderTrack = document.querySelectorAll('.slider-track')[2] as HTMLElement;
                                        if (sliderTrack && e.touches.length > 0) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.touches[0].clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep1Cursor2(newValue);
                                        }
                                      };
                                      
                                      const handleTouchEnd = () => {
                                        document.removeEventListener('touchmove', handleTouchMove);
                                        document.removeEventListener('touchend', handleTouchEnd);
                                      };
                                      
                                      document.addEventListener('touchmove', handleTouchMove);
                                      document.addEventListener('touchend', handleTouchEnd);
                                    }}
                                  ></div>
                                </div>
                                
                                {/* Value Display */}
                                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: 'calc(100% + 20px)' }}>
                                  {isManualInput2 ? (
                                    <input
                                      type="number"
                                      value={manualInput2Value}
                                      onChange={(e) => setManualInput2Value(e.target.value)}
                                      onBlur={() => {
                                        handleManualInput('step1cursor2', manualInput2Value);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleManualInput('step1cursor2', manualInput2Value);
                                        } else if (e.key === 'Escape') {
                                          setIsManualInput2(false);
                                        }
                                      }}
                                      autoFocus
                                      className="bg-transparent text-white text-lg md:text-xl font-bold border-b border-white outline-none w-20 text-center"
                                      placeholder="0"
                                      min="0"
                                      max="9999"
                                    />
                                  ) : (
                                    <span 
                                      className="text-white text-lg md:text-xl font-bold cursor-pointer hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded transition-colors"
                                      onClick={() => handleValueClick('step1cursor2')}
                                      title="Click to edit value"
                                    >
                                      {cursor2Moved ? `${calculatePrice(step1Cursor2, 'step1cursor2')}K€` : 'xxxK€'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* X marks - positioned on the image, always clickable */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '10%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setDirectChecked(!directChecked);
                                  if (!directChecked) setConstructorChecked(false); // Uncheck the other one
                                  setShowValidationError(false);
                                }}
                              >
                                {directChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="En direct selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '37%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setConstructorChecked(!constructorChecked);
                                  if (!constructorChecked) setDirectChecked(false); // Uncheck the other one
                                  setShowValidationError(false);
                                }}
                              >
                                {constructorChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Constructor selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Validation Error Message */}
                              {showValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '20%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>cocher</div>
                                    <div>une case</div>
                                  </div>
                                </div>
                              )}

                              {/* Cursor Validation Error Message */}
                              {showStep1CursorValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '30%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>bouger</div>
                                    <div>les curseurs</div>
                                  </div>
                                </div>
                              )}

                              {/* Warning messages for maximum cursor values */}
                              {showStep1MaxWarning && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '15%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>Au-delà de</div>
                                    <div>ce montant,</div>
                                    <div>contactez-nous</div>
                                  </div>
                                </div>
                              )}

                              {/* Navigation Arrows - positioned directly on the form image */}
                          
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%'
                                }}
                                onClick={currentSimuStep > 1 ? prevSimuStep : closeSimuForm}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt={currentSimuStep > 1 ? "Back" : "Back to Main"}
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%'
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 2 - Manufacturer checkboxes */}
                          {currentSimuStep === 2 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* Manufacturer Checkboxes - 6 in a column on the left side */}
                              
                              {/* MICHELIN */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '45.6%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setMichelinChecked(!michelinChecked);
                                  if (michelinChecked) setMichelinPercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {michelinChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Michelin selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* CONTINENTAL */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '52%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setContinentalChecked(!continentalChecked);
                                  if (continentalChecked) setContinentalPercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {continentalChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Continental selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* BRIDGESTONE */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '58.3%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setBridgestoneChecked(!bridgestoneChecked);
                                  if (bridgestoneChecked) setBridgestonePercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {bridgestoneChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Bridgestone selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* PIRELLI */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '64.5%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setPirelliChecked(!pirelliChecked);
                                  if (pirelliChecked) setPirelliPercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {pirelliChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Pirelli selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* DUNLOP - GOODYEAR */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '70.8%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setDunlopChecked(!dunlopChecked);
                                  if (dunlopChecked) setDunlopPercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {dunlopChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Dunlop-Goodyear selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* AUTRES */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  top: '77.2%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setAutresChecked(!autresChecked);
                                  if (autresChecked) setAutresPercent('');
                                  setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                }}
                              >
                                {autresChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Autres selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Percentage Input Boxes - appear on the right when manufacturers are selected */}
                              
                              {/* Michelin Percentage Input */}
                              {michelinChecked && (
                                <div className="absolute flex items-center" style={{ top: '45.6%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={michelinPercent}
                                    onChange={(e) => {
                                      setMichelinPercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Continental Percentage Input */}
                              {continentalChecked && (
                                <div className="absolute flex items-center" style={{ top: '52%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={continentalPercent}
                                    onChange={(e) => {
                                      setContinentalPercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Bridgestone Percentage Input */}
                              {bridgestoneChecked && (
                                <div className="absolute flex items-center" style={{ top: '58.3%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={bridgestonePercent}
                                    onChange={(e) => {
                                      setBridgestonePercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Pirelli Percentage Input */}
                              {pirelliChecked && (
                                <div className="absolute flex items-center" style={{ top: '64.5%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={pirelliPercent}
                                    onChange={(e) => {
                                      setPirelliPercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Dunlop Percentage Input */}
                              {dunlopChecked && (
                                <div className="absolute flex items-center" style={{ top: '70.8%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={dunlopPercent}
                                    onChange={(e) => {
                                      setDunlopPercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Autres Percentage Input */}
                              {autresChecked && (
                                <div className="absolute flex items-center" style={{ top: '77.2%', right: '10%' }}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={autresPercent}
                                    onChange={(e) => {
                                      setAutresPercent(e.target.value);
                                      setShowStep2ValidationError(false);
    // Reset Step 5 checkboxes
    setStep5DirectChecked(false);
    setStep5ConstructorChecked(false);
    // Reset Step 6 matrix
    setStep6Matrix([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ]);
                                    }}
                                    className="w-16 h-8 px-2 text-sm text-white bg-transparent border border-gray-400 border-opacity-30 rounded focus:border-yellow-500 focus:outline-none"
                                    placeholder="0"
                                  />
                                  <span className="text-white text-sm font-bold ml-2">%</span>
                                </div>
                              )}

                              {/* Step 2 Validation Error Message */}
                              {showStep2ValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '20%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>La somme</div>
                                    <div>doit être</div>
                                    <div>égale à 100%</div>
                                  </div>
                                </div>
                              )}

                              {/* Navigation Arrows - positioned directly on the form image */}
                              
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%'
                                }}
                                onClick={prevSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt="Back"
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%'
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 3 - Cursor with price display */}
                          {currentSimuStep === 3 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* Step 3 Cursor - positioned on the form image */}
                              <div 
                                className="absolute w-56 transition-all duration-500"
                                style={{ 
                                  bottom: '30%', 
                                  left: '40%', 
                                  transform: 'translateX(-50%)',
                                  zIndex: 50000
                                }}
                              >
                                <div 
                                  className="slider-track step3-slider-track relative h-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                                  style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    MozUserSelect: 'none',
                                    msUserSelect: 'none',
                                    WebkitTouchCallout: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                  }}
                                  onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = (x / rect.width) * 100;
                                    const newValue = Math.max(0, Math.min(100, percentage));
                                    setStep3Cursor(newValue);
                                    setStep3CursorMoved(true);
                                    setShowStep3CursorValidationError(false);
                                  }}
                                >
                                  {/* Red/Yellow filled portion */}
                                  <div 
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{ 
                                      width: `${step3Cursor}%`,
                                      backgroundColor: step3CursorMoved ? '#FFC300' : '#FF0000',
                                      transition: 'none',
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      msUserSelect: 'none',
                                      pointerEvents: 'none'
                                    }}
                                  ></div>
                                  
                                  {/* Red/Yellow circular handle */}
                                  <div 
                                    className="slider-cursor absolute rounded-full cursor-grab hover:cursor-grabbing hover:scale-110 shadow-lg"
                                    style={{ 
                                      width: '20px',
                                      height: '20px',
                                      top: '50%',
                                      left: `${step3Cursor}%`,
                                      transform: 'translate(-50%, -50%)',
                                      backgroundColor: step3CursorMoved ? '#FFC300' : '#FF0000',
                                      zIndex: 100,
                                      transition: 'transform 0.1s ease',
                                      border: `2px solid ${step3CursorMoved ? '#FFC300' : '#FF0000'}`,
                                      boxShadow: `0 2px 6px rgba(${step3CursorMoved ? '255, 195, 0' : '255, 0, 0'}, 0.3)`,
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      pointerEvents: 'auto',
                                      cursor: 'grab'
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setStep3CursorMoved(true);
                                      setShowStep3CursorValidationError(false);
                                      
                                      document.body.style.cursor = 'grabbing';
                                      
                                      const handleMouseMove = (e: MouseEvent) => {
                                        const sliderTrack = document.querySelector('.step3-slider-track') as HTMLElement;
                                        if (sliderTrack) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep3Cursor(newValue);
                                        }
                                      };
                                      
                                      const handleMouseUp = () => {
                                        document.body.style.cursor = '';
                                        document.removeEventListener('mousemove', handleMouseMove);
                                        document.removeEventListener('mouseup', handleMouseUp);
                                      };
                                      
                                      document.addEventListener('mousemove', handleMouseMove);
                                      document.addEventListener('mouseup', handleMouseUp);
                                    }}
                                    onTouchStart={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setStep3CursorMoved(true);
                                      setShowStep3CursorValidationError(false);
                                      
                                      const handleTouchMove = (e: TouchEvent) => {
                                        const sliderTrack = document.querySelector('.step3-slider-track') as HTMLElement;
                                        if (sliderTrack && e.touches.length > 0) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.touches[0].clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep3Cursor(newValue);
                                        }
                                      };
                                      
                                      const handleTouchEnd = () => {
                                        document.removeEventListener('touchmove', handleTouchMove);
                                        document.removeEventListener('touchend', handleTouchEnd);
                                      };
                                      
                                      document.addEventListener('touchmove', handleTouchMove);
                                      document.addEventListener('touchend', handleTouchEnd);
                                    }}
                                  ></div>
                                </div>
                                
                                {/* Value Display */}
                                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: 'calc(100% + 10px)' }}>
                                  {isManualInput3 ? (
                                    <input
                                      type="number"
                                      value={manualInput3Value}
                                      onChange={(e) => setManualInput3Value(e.target.value)}
                                      onBlur={() => {
                                        handleManualInput('step3cursor', manualInput3Value);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleManualInput('step3cursor', manualInput3Value);
                                        } else if (e.key === 'Escape') {
                                          setIsManualInput3(false);
                                        }
                                      }}
                                      autoFocus
                                      className="bg-transparent text-white text-lg md:text-xl font-bold border-b border-white outline-none w-20 text-center"
                                      placeholder="0"
                                      min="0"
                                      max="4999"
                                    />
                                  ) : (
                                    <span 
                                      className="text-white text-lg md:text-xl font-bold cursor-pointer hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded transition-colors"
                                      onClick={() => handleValueClick('step3cursor')}
                                      title="Click to edit value"
                                    >
                                      {step3CursorMoved ? `${calculatePrice(step3Cursor, 'step3cursor')}K€` : 'xxxK€'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Step 3 Checkboxes - same as Step 1 */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '10%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep3DirectChecked(!step3DirectChecked);
                                  if (!step3DirectChecked) setStep3ConstructorChecked(false); // Uncheck the other one
                                  setShowStep3ValidationError(false);
                                }}
                              >
                                {step3DirectChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="En direct selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '37%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep3ConstructorChecked(!step3ConstructorChecked);
                                  if (!step3ConstructorChecked) setStep3DirectChecked(false); // Uncheck the other one
                                  setShowStep3ValidationError(false);
                                }}
                              >
                                {step3ConstructorChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Constructor selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Step 3 Validation Error Message */}
                              {showStep3ValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '20%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>cocher</div>
                                    <div>une case</div>
                                  </div>
                                </div>
                              )}

                              {/* Step 3 Cursor Validation Error Message */}
                              {showStep3CursorValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '30%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>bouger</div>
                                    <div>le curseur</div>
                                  </div>
                                </div>
                              )}

                              {/* Warning message for maximum cursor value */}
                              {showStep3MaxWarning && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '15%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>Au-delà de</div>
                                    <div>ce montant,</div>
                                    <div>contactez-nous</div>
                                  </div>
                                </div>
                              )}

                              {/* Navigation Arrows - positioned directly on the form image */}
                              
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%'
                                }}
                                onClick={prevSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt="Back"
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%'
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 4 - Cursor with price display and checkboxes */}
                          {currentSimuStep === 4 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* Step 4 Top Checkboxes - above the gauge bar */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '37%', 
                                  left: '9.7%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep4TopLeftChecked(!step4TopLeftChecked);
                                  // Top checkboxes are independent - no mutual exclusion
                                  setShowStep4ValidationError(false);
                                }}
                              >
                                {step4TopLeftChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Top left selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '37%', 
                                  left: '51%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep4TopRightChecked(!step4TopRightChecked);
                                  // Top checkboxes are independent - no mutual exclusion
                                  setShowStep4ValidationError(false);
                                }}
                              >
                                {step4TopRightChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Top right selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Step 4 Cursor - positioned on the form image */}
                              <div 
                                className="absolute w-56 transition-all duration-500"
                                style={{ 
                                  bottom: '30%', 
                                  left: '40%', 
                                  transform: 'translateX(-50%)',
                                  zIndex: 50000
                                }}
                              >
                                <div 
                                  className="slider-track step4-slider-track relative h-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                                  style={{
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    MozUserSelect: 'none',
                                    msUserSelect: 'none',
                                    WebkitTouchCallout: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                  }}
                                  onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const percentage = (x / rect.width) * 100;
                                    const newValue = Math.max(0, Math.min(100, percentage));
                                    setStep4Cursor(newValue);
                                    setStep4CursorMoved(true);
                                    setShowStep4CursorValidationError(false);
                                  }}
                                >
                                  {/* Red/Yellow filled portion */}
                                  <div 
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{ 
                                      width: `${step4Cursor}%`,
                                      backgroundColor: step4CursorMoved ? '#FFC300' : '#FF0000',
                                      transition: 'none',
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      msUserSelect: 'none',
                                      pointerEvents: 'none'
                                    }}
                                  ></div>
                                  
                                  {/* Red/Yellow circular handle */}
                                  <div 
                                    className="slider-cursor absolute rounded-full cursor-grab hover:cursor-grabbing hover:scale-110 shadow-lg"
                                    style={{ 
                                      width: '20px',
                                      height: '20px',
                                      top: '50%',
                                      left: `${step4Cursor}%`,
                                      transform: 'translate(-50%, -50%)',
                                      backgroundColor: step4CursorMoved ? '#FFC300' : '#FF0000',
                                      zIndex: 100,
                                      transition: 'transform 0.1s ease',
                                      border: `2px solid ${step4CursorMoved ? '#FFC300' : '#FF0000'}`,
                                      boxShadow: `0 2px 6px rgba(${step4CursorMoved ? '255, 195, 0' : '255, 0, 0'}, 0.3)`,
                                      userSelect: 'none',
                                      WebkitUserSelect: 'none',
                                      MozUserSelect: 'none',
                                      pointerEvents: 'auto',
                                      cursor: 'grab'
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setStep4CursorMoved(true);
                                      setShowStep4CursorValidationError(false);
                                      
                                      document.body.style.cursor = 'grabbing';
                                      
                                      const handleMouseMove = (e: MouseEvent) => {
                                        const sliderTrack = document.querySelector('.step4-slider-track') as HTMLElement;
                                        if (sliderTrack) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep4Cursor(newValue);
                                        }
                                      };
                                      
                                      const handleMouseUp = () => {
                                        document.body.style.cursor = '';
                                        document.removeEventListener('mousemove', handleMouseMove);
                                        document.removeEventListener('mouseup', handleMouseUp);
                                      };
                                      
                                      document.addEventListener('mousemove', handleMouseMove);
                                      document.addEventListener('mouseup', handleMouseUp);
                                    }}
                                    onTouchStart={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setStep4CursorMoved(true);
                                      setShowStep4CursorValidationError(false);
                                      
                                      const handleTouchMove = (e: TouchEvent) => {
                                        const sliderTrack = document.querySelector('.step4-slider-track') as HTMLElement;
                                        if (sliderTrack && e.touches.length > 0) {
                                          const rect = sliderTrack.getBoundingClientRect();
                                          const x = e.touches[0].clientX - rect.left;
                                          const percentage = (x / rect.width) * 100;
                                          const newValue = Math.max(0, Math.min(100, percentage));
                                          setStep4Cursor(newValue);
                                        }
                                      };
                                      
                                      const handleTouchEnd = () => {
                                        document.removeEventListener('touchmove', handleTouchMove);
                                        document.removeEventListener('touchend', handleTouchEnd);
                                      };
                                      
                                      document.addEventListener('touchmove', handleTouchMove);
                                      document.addEventListener('touchend', handleTouchEnd);
                                    }}
                                  ></div>
                                </div>
                                
                                {/* Value Display */}
                                <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: 'calc(100% + 20px)' }}>
                                  {isManualInput4 ? (
                                    <input
                                      type="number"
                                      value={manualInput4Value}
                                      onChange={(e) => setManualInput4Value(e.target.value)}
                                      onBlur={() => {
                                        handleManualInput('step4cursor', manualInput4Value);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleManualInput('step4cursor', manualInput4Value);
                                        } else if (e.key === 'Escape') {
                                          setIsManualInput4(false);
                                        }
                                      }}
                                      autoFocus
                                      className="bg-transparent text-white text-lg md:text-xl font-bold border-b border-white outline-none w-16 text-center"
                                      placeholder="0"
                                      min="0"
                                      max="100"
                                    />
                                  ) : (
                                    <span 
                                      className="text-white text-lg md:text-xl font-bold cursor-pointer hover:bg-white hover:bg-opacity-20 px-2 py-1 rounded transition-colors"
                                      onClick={() => handleValueClick('step4cursor')}
                                      title="Click to edit value"
                                    >
                                      {step4CursorMoved ? `${calculatePrice(step4Cursor, 'step4cursor')}K` : 'xxxK'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Step 4 Checkboxes - same as Step 1 and 3 */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '10%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep4DirectChecked(!step4DirectChecked);
                                  if (!step4DirectChecked) {
                                    // Only uncheck the other bottom checkbox
                                    setStep4ConstructorChecked(false);
                                  }
                                  setShowStep4ValidationError(false);
                                }}
                              >
                                {step4DirectChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="En direct selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '37%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep4ConstructorChecked(!step4ConstructorChecked);
                                  if (!step4ConstructorChecked) {
                                    // Only uncheck the other bottom checkbox
                                    setStep4DirectChecked(false);
                                  }
                                  setShowStep4ValidationError(false);
                                }}
                              >
                                {step4ConstructorChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Constructor selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Step 4 Validation Error Message */}
                              {showStep4ValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '20%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>cocher</div>
                                    <div>une case</div>
                                  </div>
                                </div>
                              )}

                              {/* Step 4 Cursor Validation Error Message */}
                              {showStep4CursorValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '30%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>bouger</div>
                                    <div>le curseur</div>
                                  </div>
                                </div>
                              )}

                              {/* Warning message for maximum cursor value */}
                              {showStep4MaxWarning && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '15%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>Au-delà de</div>
                                    <div>ce montant,</div>
                                    <div>contactez-nous</div>
                                  </div>
                                </div>
                              )}

                              {/* Navigation Arrows - positioned directly on the form image */}
                              
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%'
                                }}
                                onClick={prevSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt="Back"
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%'
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 5 - Checkboxes like Step 1 and 3 */}
                          {currentSimuStep === 5 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* Step 5 Checkboxes - same as Step 1 and 3 */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '10%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep5DirectChecked(!step5DirectChecked);
                                  if (!step5DirectChecked) setStep5ConstructorChecked(false); // Uncheck the other one
                                  setShowStep5ValidationError(false);
                                }}
                              >
                                {step5DirectChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="En direct selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              <div 
                                className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{ 
                                  bottom: '22%', 
                                  left: '37%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onClick={() => {
                                  setStep5ConstructorChecked(!step5ConstructorChecked);
                                  if (!step5ConstructorChecked) setStep5DirectChecked(false); // Uncheck the other one
                                  setShowStep5ValidationError(false);
                                }}
                              >
                                {step5ConstructorChecked ? (
                                  <img 
                                    src="/UI & UX SIMU/FLECHES+X/X par un_.png" 
                                    alt="Constructor selected" 
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <div className="w-5 h-5 bg-transparent border-transparent"></div>
                                )}
                              </div>

                              {/* Step 5 Validation Error Message */}
                              {showStep5ValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '20%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>vous devez</div>
                                    <div>cocher</div>
                                    <div>une case</div>
                                  </div>
                                </div>
                              )}

                              {/* Navigation Arrows - positioned directly on the form image */}
                              
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%'
                                }}
                                onClick={prevSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt="Back"
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%'
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 6 - Matrix of text inputs (4 columns × 3 rows) */}
                          {currentSimuStep === 6 && (
                            <div className={`absolute inset-0 transition-all duration-200 ease-in-out ${
                              isStepFlipping 
                                ? 'opacity-0 scale-95' 
                                : 'opacity-100 scale-100'
                            }`}>
                              {/* Matrix of Text Inputs and Dropdowns */}
                              {step6Matrix.map((row, rowIndex) => 
                                row.map((value, colIndex) => (
                                  <div 
                                    key={`${rowIndex}-${colIndex}`}
                                    className="absolute"
                                    style={{ 
                                      top: `${53 + rowIndex * 7}%`, 
                                      left: `${[8.5, 37, 52, 74][colIndex]}%`,
                                      zIndex: 10000
                                    }}
                                  >
                                    {colIndex === 3 ? (
                                      // 4th column: Dropdown menu
                                      <select
                                        value={value}
                                        onChange={(e) => updateStep6Matrix(rowIndex, colIndex, e.target.value)}
                                        className="w-16 h-6 px-1 text-xs font-medium text-white bg-transparent border border-transparent rounded focus:border-yellow-400 focus:outline-none"
                                        style={{ 
                                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                          color: 'white'
                                        }}
                                      >
                                        <option value="" style={{ backgroundColor: '#0D1B2A', color: 'white' }}>-</option>
                                        <option value="1L" style={{ backgroundColor: '#0D1B2A', color: 'white' }}>1L</option>
                                        <option value="4L" style={{ backgroundColor: '#0D1B2A', color: 'white' }}>4L</option>
                                        <option value="Fût" style={{ backgroundColor: '#0D1B2A', color: 'white' }}>Fût</option>
                                        <option value="Vrac" style={{ backgroundColor: '#0D1B2A', color: 'white' }}>Vrac</option>
                                      </select>
                                    ) : (
                                      // Other columns: Text inputs
                                      <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => updateStep6Matrix(rowIndex, colIndex, e.target.value)}
                                        maxLength={colIndex === 0 ? 8 : colIndex === 1 ? 6 : colIndex === 2 ? 6 : undefined}
                                        className={`${colIndex === 0 ? 'w-20' : colIndex === 1 ? 'w-12' : colIndex === 2 ? 'w-14' : 'w-20'} h-6 px-1 text-xs font-medium text-white bg-transparent border border-transparent rounded focus:border-yellow-400 focus:outline-none placeholder-gray-400`}
                                        placeholder=""
                                      />
                                    )}
                                  </div>
                                ))
                              )}

                              {/* Step 6 Validation Error Message */}
                              {showStep6ValidationError && (
                                <div 
                                  className="absolute animate-pulse text-right"
                                  style={{ top: '30%', right: '10%' }}
                                >
                                  <div className="text-red-500 text-sm font-bold">
                                    <div>Completez</div>
                                    <div>au moins</div>
                                    <div>une ligne</div>
                                  </div>
                                </div>
                              )}

                              {/* CALCULEZ VOS GAINS Button - positioned at bottom of Step 6 */}
                              <div 
                                className="absolute hover:opacity-80 transition-opacity duration-300"
                                style={{ 
                                  bottom: '16%', 
                                  left: '50%', 
                                  transform: 'translateX(-50%) scale(1.7)',
                                  zIndex: 1000
                                }}
                              >
                                <div className="relative">
                                  <img
                                    src="/simu/SIMU CALCULEZ/CTA CALCUL.png"
                                    alt="Button Background"
                                    className="h-24 object-contain"
                                    style={{ pointerEvents: 'none' }}
                                  />
                                  <img
                                    src="/simu/CALCULEZ VOS GAINS.png"
                                    alt="CALCULEZ VOS GAINS"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 object-contain cursor-pointer"
                                    onClick={nextSimuStep}
                                  />
                                </div>
                              </div>

                              {/* Navigation Arrows - positioned directly on the form image */}
                              
                              {/* Back Arrow - Bottom Left of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  left: '8%',
                                  zIndex: 10001
                                }}
                                onClick={prevSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/BACK.png" 
                                  alt="Back"
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>

                              {/* Next Arrow - Bottom Right of Form Image */}
                              <div 
                                className="absolute cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80"
                                style={{ 
                                  bottom: '12%', 
                                  right: '8%',
                                  zIndex: 10001
                                }}
                                onClick={nextSimuStep}
                              >
                                <img 
                                  src="/UI & UX SIMU/FLECHES+X/NEXT.png" 
                                  alt="Next" 
                                  className={`w-5 h-5 ${isStepFlipping ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Results Page */
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative">
                          <img
                            src="/UI & UX SIMU/SIMU -GAINS/SIMU -GAINS X.png"
                            alt="Simulator Results"
                            className="max-w-sm max-h-full object-contain"
                          />
                          
                          {/* Animated Gains Amount */}
                          <div 
                            className="absolute"
                            style={{ 
                              bottom: '44%', 
                              left: '50%', 
                              transform: 'translateX(-50%)'
                            }}
                          >
                            <div className={`text-center ${isRolling ? 'gains-rolling' : 'gains-final'}`}>
                              <span className="text-white text-3xl md:text-4xl font-bold tracking-wider">
                                {currentDisplayAmount.toLocaleString()}€
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons - Recevoir un mail and Prendre contact */}
                          <div className="absolute" style={{ bottom: '19%', left: '50%', transform: 'translateX(-50%)' }}>
                            <div className="flex flex-row items-center justify-center gap-4 w-full max-w-3xl">
                              
                              {/* Recevoir un mail Button */}
                              <div 
                                className={`relative cursor-pointer hover:opacity-80 transition-opacity duration-300 ${
                                  showGainsButtons ? 'button-pop-enter' : 'button-hidden'
                                }`}
                                onClick={() => {
                                  setShowEmailModal(true);
                                }}
                                style={{ width: '150px', height: '40px' }}
                              >
                                <img
                                  src="/UI & UX SIMU/SIMU -GAINS/CTA MAIL.png"
                                  alt="Mail Button Background"
                                  className="w-full h-full object-fill"
                                />
                                <img
                                  src="/UI & UX SIMU/SIMU -GAINS/Recevoir un mail.png"
                                  alt="Recevoir un mail"
                                  className="absolute top-1/2 left-1/2 object-contain"
                                  style={{ transform: 'translate(-50%, -50%) scale(0.9)', height: '24px' }}
                                />
                              </div>

                              {/* Prendre contact Button */}
                              <div 
                                className={`relative cursor-pointer hover:opacity-80 transition-opacity duration-300 ${
                                  showSecondButton ? 'button-pop-enter' : 'button-hidden'
                                }`}
                                onClick={openMailClient}
                                style={{ width: '150px', height: '40px' }}
                              >
                                <img
                                  src="/UI & UX SIMU/SIMU -GAINS/CTA CONTACT.png"
                                  alt="Contact Button Background"
                                  className="w-full h-full object-fill"
                                />
                                <img
                                  src="/UI & UX SIMU/SIMU -GAINS/Prendre contact.png"
                                  alt="Prendre contact"
                                  className="absolute top-1/2 left-1/2 object-contain"
                                  style={{ transform: 'translate(-50%, -50%) scale(0.9)', height: '24px' }}
                                />
                              </div>

                            </div>
                          </div>
                          
                          {/* Refresh Icon - positioned to the right of the gains amount */}
                          <div 
                            className="absolute cursor-pointer transition-all duration-300 hover:opacity-70"
                            style={{ 
                              bottom: '43%', 
                              left: '78%', 
                              transform: 'translateY(-50%)'
                            }}
                            onClick={closeSimuForm}
                          >
                            <img
                              src="/UI & UX SIMU/SIMU -GAINS/159612.png"
                              alt="Restart Simulator"
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* Animation Page - after the simulator */}
          <div className="h-screen flex items-center justify-center relative" style={{ backgroundColor: '#0D1B2A' }}>
            <div className="text-center">
              <img 
                src="/assets/gifs/ANIM-DEKSTOP.gif"
                alt="PERF Animation"
                className="max-w-lg md:max-w-2xl h-auto"
              />
            </div>
          </div>
          
          {/* Footer - Hidden on mobile for Roulette page */}
          <div className="relative hidden md:block" style={{ backgroundColor: '#0D1B2A' }}>
            {/* Golden top border */}
            <div className="w-full h-px" style={{ backgroundColor: '#FFC300' }}></div>
            
            {/* Footer content */}
            <div className="py-3 px-6 relative" style={{ backgroundColor: 'transparent' }}>
              {/* Footer content in one line */}
              <div className="flex justify-between items-center">
                {/* Copyright - Left aligned on mobile, centered on desktop */}
                <div className="flex-1 flex justify-start md:justify-center">
                  <img 
                    src="/footer/PERF2025.png" 
                    alt="© PERF 2025" 
                    className="h-3 w-auto"
                  />
                </div>
                
                {/* Website powered by - Right aligned */}
                <div className="flex items-center">
                  <img 
                    src="/footer/website powered by.png" 
                    alt="Website powered by" 
                    className="h-2 w-auto mr-2"
                  />
                  <a 
                    href="https://www.okfred.biz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/footer/logo-OKFRED.png" 
                      alt="OKFRED Logo" 
                      className="h-4 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Light grey bottom border */}
            <div className="w-full h-px bg-gray-300"></div>
          </div>
        </div>
        )}

        {/* Express Menu - Desktop: right side, Mobile: bottom */}
        <div className={`hidden md:flex fixed top-1/2 transform -translate-y-1/2 flex-col space-y-4 transition-all duration-500 ease-in-out z-[100]`} style={{ right: '18px' }}>
          <div 
            onClick={toggleContactButton}
            className="hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/CONTACT.png" 
              alt="Contact" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            className="hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            onClick={() => {
              console.log('PERF_POINTS icon clicked - navigating to À propos page');
              navigateToPage('apropos');
            }}
          >
            <img 
              src="/assets/express_menu/PERF_POINTS.png" 
              alt="PERF Points" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            className="hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
            onClick={() => {
              console.log('KEY icon clicked - navigating to roulette page');
              navigateToPage('roulette');
            }}
          >
            <img 
              src="/assets/express_menu/key.png" 
              alt="Key" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
            {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                style={{ 
                  backgroundColor: '#0D1B2A'
                }}
              />
            )}
          </div>
          <div 
            onClick={scrollToSimulator}
            className="hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/SIMU.png" 
              alt="Simulation" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            onClick={scrollToVideo}
            className="hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '1.1s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/PLAY.png" 
              alt="Play" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          {showScrollToTop && !showRoulettePage && (
            <div 
              onClick={scrollToTop}
              className={`transition-all duration-500 ease-in-out cursor-pointer animate-slide-in-right relative ${
                fadeOutScrollToTop ? 'animate-fade-out' : 'animate-fade-in'
              }`}
            >
              <img 
                src="/assets/express_menu/FLECHE UP.png" 
                alt="Scroll to Top" 
                className="w-[22px] h-[22px] transition-all duration-300 hover:scale-110 hover:brightness-110 relative z-10"
              />
              {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                  style={{ 
                    backgroundColor: '#0D1B2A'
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Express Menu - Mobile: bottom */}
        <div className="md:hidden fixed bottom-1 left-1/2 transform -translate-x-1/2 flex flex-row space-x-4 z-[100]">
          <div 
            onClick={toggleContactButton}
            className="hover:opacity-90 transition-all duration-300 cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/CONTACT.png" 
              alt="Contact" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            className="hover:opacity-90 transition-all duration-300 cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            onClick={() => {
              console.log('PERF_POINTS icon clicked - navigating to À propos page');
              navigateToPage('apropos');
            }}
          >
            <img 
              src="/assets/express_menu/PERF_POINTS.png" 
              alt="PERF Points" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            className="hover:opacity-90 transition-all duration-300 cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
            onClick={() => {
              console.log('KEY icon clicked - navigating to roulette page');
              navigateToPage('roulette');
            }}
          >
            <img 
              src="/assets/express_menu/key.png" 
              alt="Key" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
            {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                style={{ 
                  backgroundColor: '#0D1B2A'
                }}
              />
            )}
          </div>
          <div 
            onClick={scrollToSimulator}
            className="hover:opacity-90 transition-all duration-300 cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/SIMU.png" 
              alt="Simulation" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          <div 
            onClick={scrollToVideo}
            className="hover:opacity-90 transition-all duration-300 cursor-pointer animate-slide-in-right transform hover:scale-125 hover:-translate-y-2 hover:shadow-lg group relative"
            style={{ animationDelay: '1.1s', animationFillMode: 'both' }}
          >
            <img 
              src="/assets/express_menu/PLAY.png" 
              alt="Play" 
              className="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 relative z-10"
            />
             {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
               <div 
                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                 style={{ 
                   backgroundColor: '#0D1B2A'
                 }}
               />
             )}
          </div>
          {showScrollToTop && !showRoulettePage && (
            <div 
              onClick={scrollToTop}
              className="transition-all duration-300 cursor-pointer animate-slide-in-right animate-fade-in relative"
            >
              <img 
                src="/assets/express_menu/FLECHE UP.png" 
                alt="Scroll to Top" 
                className="w-[22px] h-[22px] transition-all duration-300 hover:scale-110 hover:brightness-110 relative z-10"
              />
              {(showAProposPage || showRoulettePage || (!showAProposPage && !showRoulettePage && !showVideoPage)) && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 z-0"
                  style={{ 
                    backgroundColor: '#0D1B2A'
                  }}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Brands Logo - fades out based on scroll position */}
      {showMainContent && (
        <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-10">
          <img 
            src={`/deroulant/marques2.gif?t=${gifKey}`}
            alt="Brands" 
            className="h-20 md:h-24 w-auto transition-opacity duration-300"
            style={{ opacity: marquesOpacity }}
            key={`brands-gif-${gifKey}`} // Force re-render to restart GIF animation
          />
        </div>
      )}

      {/* Contact Toast - Yellow Card Design */}
      <div className={`fixed bottom-12 md:bottom-8 right-4 md:right-12 z-50 transition-all duration-500 ease-out transform ${
        showContactToast 
          ? 'translate-x-0 translate-y-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}>
        <div className="relative">
          {/* Main toast container with contact bloc background */}
          <div className="relative max-w-56">
            {/* Contact bloc background image */}
            <img 
              src="/contact/contact bloc.png" 
              alt="Contact Background" 
              className="w-56 h-auto"
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-8">
              {/* Envie text on top */}
              <div className="text-center mb-3">
                <img 
                  src="/contact/envie.png" 
                  alt="Envie d'en savoir plus" 
                  className="w-48 h-auto mx-auto"
                />
              </div>
              
              {/* Large square photo in middle */}
              <div className="mb-3">
                <img 
                  src="/contact/HIPPO photo.png" 
                  alt="Hippolite" 
                  className="w-48 h-48 object-cover shadow-md"
                />
              </div>
              
              {/* Name under photo */}
              <div className="text-center mb-1">
                <img 
                  src="/contact/hipponame.png" 
                  alt="Hippolite Name" 
                  className="w-48 h-auto mx-auto"
                />
              </div>
              
              {/* Contact button at bottom */}
              <div className="relative self-end cursor-pointer" onClick={openBlankContact}>
                <img 
                  src="/contact/bloc CTA.png" 
                  alt="Button Background" 
                  className="h-4 md:h-5 w-auto hover:opacity-90 transition-opacity"
                />
                <img 
                  src="/contact/CONTACT.png" 
                  alt="CONTACT" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[8px] md:h-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4">
            {/* Modal background with website styling */}
            <div 
              className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2"
              style={{ backgroundColor: '#0D1B2A', borderColor: '#FFC300' }}
            >
              
              {/* Modal content */}
              <div className="p-8 text-center">
                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-6">
                  {emailSent ? 'Email envoyé !' : 'Recevoir les résultats'}
                </h2>
                
                {/* Email input or success message */}
                {emailSent ? (
                  <div className="mb-6">
                    <div className="text-yellow-400 text-lg">
                      ✓ Vos résultats ont été envoyés à votre adresse email !
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-white text-sm font-medium mb-2 text-left">
                      Votre adresse email :
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      disabled={isEmailSending}
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none text-white placeholder-gray-300 disabled:opacity-50"
                      style={{ 
                        backgroundColor: '#0D1B2A', 
                        borderColor: '#FFC300',
                        color: 'white'
                      }}
                    />
                  </div>
                )}
                
                {/* Buttons */}
                {!emailSent && (
                  <div className="flex gap-4 justify-center">
                    {/* Cancel button */}
                    <button
                      onClick={() => {
                        setShowEmailModal(false);
                        setUserEmail('');
                        setIsEmailSending(false);
                        setEmailSent(false);
                      }}
                      disabled={isEmailSending}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50"
                    >
                      Annuler
                    </button>
                    
                    {/* Send button */}
                    <button
                      onClick={sendSimulationResults}
                      disabled={!userEmail.trim() || isEmailSending}
                      className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:bg-gray-400 disabled:text-gray-600 transition-colors duration-300 font-medium"
                      style={{ backgroundColor: userEmail.trim() && !isEmailSending ? '#FFC300' : undefined }}
                    >
                      {isEmailSending ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;