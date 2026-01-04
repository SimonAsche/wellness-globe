/**
 * WELLNESS•GLOBE ROI Calculator
 * Interactive calculator for franchise investment projections
 */

const INVESTMENT_MODELS = {
  'model-a': {
    code: 'A',
    name: 'Model A - Single Room',
    investment: 150000,
    maxPatients: 216,
    breakeven: 67,
    maxAnnualProfit: 500000,
    hasBonusOption: true
  },
  'model-b': {
    code: 'B',
    name: 'Model B - Dual Room',
    investment: 300000,
    maxPatients: 432,
    breakeven: 134,
    maxAnnualProfit: 972000,
    hasBonusOption: false
  },
  'model-c': {
    code: 'C',
    name: 'Model C - Flagship',
    investment: 450000,
    maxPatients: 648,
    breakeven: 200,
    maxAnnualProfit: 1458000,
    hasBonusOption: false
  }
};

const CONFIG = {
  revenuePerPatient: 7500,
  investorSharePercentage: 0.30,
  bonusMultiplier: 2,
  currency: 'EUR'
};

class ROICalculator {
  constructor() {
    this.modelSelect = document.getElementById('model-select');
    this.patientSlider = document.getElementById('patient-slider');
    this.patientValue = document.getElementById('patient-value');
    this.bonusCheckbox = document.getElementById('bonus-checkbox');
    this.bonusContainer = document.getElementById('bonus-container');
    
    this.resultGrossRevenue = document.getElementById('result-gross-revenue');
    this.resultInvestorShare = document.getElementById('result-investor-share');
    this.resultROI = document.getElementById('result-roi');
    this.resultBreakeven = document.getElementById('result-breakeven');
    this.statusElement = document.getElementById('calculator-status');
    
    this.init();
  }
  
  init() {
    // Set initial values
    this.updateSliderMax();
    this.updateBonusVisibility();
    this.calculate();
    
    // Event listeners
    this.modelSelect.addEventListener('change', () => {
      this.updateSliderMax();
      this.updateBonusVisibility();
      this.calculate();
    });
    
    this.patientSlider.addEventListener('input', () => {
      this.patientValue.textContent = this.patientSlider.value;
      this.calculate();
    });
    
    if (this.bonusCheckbox) {
      this.bonusCheckbox.addEventListener('change', () => {
        this.calculate();
      });
    }
  }
  
  updateSliderMax() {
    const model = INVESTMENT_MODELS[this.modelSelect.value];
    if (model) {
      this.patientSlider.max = model.maxPatients;
      // Set default to halfway
      const defaultValue = Math.round(model.maxPatients * 0.5);
      this.patientSlider.value = defaultValue;
      this.patientValue.textContent = defaultValue;
    }
  }
  
  updateBonusVisibility() {
    const model = INVESTMENT_MODELS[this.modelSelect.value];
    if (this.bonusContainer) {
      this.bonusContainer.style.display = model && model.hasBonusOption ? 'flex' : 'none';
      if (!model || !model.hasBonusOption) {
        this.bonusCheckbox.checked = false;
      }
    }
  }
  
  calculate() {
    const model = INVESTMENT_MODELS[this.modelSelect.value];
    if (!model) return;
    
    const patientVolume = parseInt(this.patientSlider.value, 10);
    const bonusEnabled = this.bonusCheckbox && this.bonusCheckbox.checked && model.hasBonusOption;
    
    // Gross revenue
    const grossRevenue = patientVolume * CONFIG.revenuePerPatient;
    
    // Investor share (with potential bonus)
    let sharePercentage = CONFIG.investorSharePercentage;
    if (bonusEnabled && patientVolume >= model.maxPatients) {
      sharePercentage *= CONFIG.bonusMultiplier;
    }
    const investorShare = grossRevenue * sharePercentage;
    
    // ROI calculation
    const roi = ((investorShare - model.investment) / model.investment * 100);
    
    // Breakeven status
    const breakevenReached = patientVolume >= model.breakeven;
    
    // Update UI
    this.resultGrossRevenue.textContent = this.formatCurrency(grossRevenue);
    this.resultInvestorShare.textContent = this.formatCurrency(investorShare);
    this.resultROI.textContent = `${roi.toFixed(1)}%`;
    this.resultBreakeven.textContent = `${model.breakeven} patients`;
    
    // Update status
    if (breakevenReached) {
      const profitMode = investorShare > model.investment;
      if (profitMode) {
        this.statusElement.textContent = '✓ INVESTMENT RECOVERED — PURE PROFIT MODE';
        this.statusElement.style.background = 'rgba(34, 197, 94, 0.1)';
        this.statusElement.style.color = '#22c55e';
      } else {
        this.statusElement.textContent = '✓ BREAKEVEN REACHED — BUILDING MOMENTUM';
        this.statusElement.style.background = 'rgba(6, 182, 212, 0.1)';
        this.statusElement.style.color = '#06b6d4';
      }
    } else {
      const remaining = model.breakeven - patientVolume;
      this.statusElement.textContent = `${remaining} more patients to breakeven`;
      this.statusElement.style.background = 'rgba(249, 115, 22, 0.1)';
      this.statusElement.style.color = '#f97316';
    }
    
    // Color code ROI
    if (roi > 0) {
      this.resultROI.classList.add('calculator__result-value--success');
      this.resultROI.classList.remove('calculator__result-value--highlight');
    } else {
      this.resultROI.classList.remove('calculator__result-value--success');
      this.resultROI.classList.add('calculator__result-value--highlight');
    }
  }
  
  formatCurrency(value) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: CONFIG.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq-item--open');
        }
      });
      
      // Toggle current item
      item.classList.toggle('faq-item--open');
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize ROI Calculator
  if (document.getElementById('model-select')) {
    new ROICalculator();
  }
  
  // Initialize FAQ
  initFAQ();
  
  // Initialize scroll animations
  initScrollAnimations();
});
