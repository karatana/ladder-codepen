const inputText = document.getElementById('inputText');
const userButtons = document.getElementById('userButtons');
const radarChart = document.getElementById('radarChart');

inputText.addEventListener('input', function () {
  const lines = inputText.value.split('\n');
  const elements = lines[0].split(',').slice(1);
  const users = lines.slice(1).map((line) => line.split(','));

  userButtons.innerHTML = '';
  users.forEach((user, index) => {
    const button = document.createElement('button');
    // Change 'btn-outline-primary' to 'btn-primary' for the first button
    button.className =
      index === 0 ? 'btn btn-primary me-2' : 'btn btn-outline-primary me-2';
    button.textContent = user[0];
    button.addEventListener('click', () => {
      // Add this line to change the color of previously selected button
      document.querySelector('.btn-primary').className =
        'btn btn-outline-primary me-2';
      // Add this line to change the color of the currently selected button
      button.className = 'btn btn-primary me-2';
      drawRadarChart(index);
    });
    userButtons.appendChild(button);
  });
  drawRadarChart(0);

  function drawRadarChart(userIndex) {
    const data = {
      type: 'scatterpolar',
      r: users[userIndex].slice(1),
      theta: elements,
      fill: 'toself',
    };

    const layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 5],
        },
      },
      showlegend: false,
      title: users[userIndex][0],
      // Add margin to prevent cutting off
      margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50,
      },
    };

    Plotly.newPlot(radarChart, [data], layout);
  }
});

inputText.dispatchEvent(new Event('input'));
