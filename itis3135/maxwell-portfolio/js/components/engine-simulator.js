document.addEventListener('DOMContentLoaded', () => {
    const rpmSlider = document.getElementById('rpm-slider');
    const rpmValue = document.getElementById('rpm-value');
    const torqueOutput = document.getElementById('torque-output');
    
    // Simulate torque curve
    rpmSlider.addEventListener('input', (e) => {
      const rpm = e.target.value;
      rpmValue.textContent = rpm;
      
      // Fake torque calculation (replace with real formula)
      const torque = (15.2 - (rpm - 1000) * 0.002).toFixed(1);
      torqueOutput.textContent = torque;
    });
  });