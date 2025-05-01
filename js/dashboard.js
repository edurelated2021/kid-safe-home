$(document).ready(function() {

  // Logout
  $('#logoutBtn').click(function() {
    window.location.href = "/";
  });

  // Chat Ask
  $('#chatSendBtn').click(function () {
    const question = $('#chatInput').val().trim();
    if (!question) return alert("Please enter a question.");

    $('#chatProcessingLoader').show();                  
    $('#chatResponse').removeClass('visible').html(''); 

    $.ajax({
      type: 'POST',
      url: '/api/chat',
      contentType: 'application/json',
      data: JSON.stringify({ question }),
      success: function (data) {
        $('#chatProcessingLoader').hide();
        $('#chatResponse').html(`<h2><strong>Recommendations:</h2></strong> ${data.answer}`).addClass('visible');
      },
      error: function () {
        $('#chatProcessingLoader').hide();
        $('#chatResponse').html('An error occurred while processing your question.').addClass('visible');
      }
    });
  });


  // Analyze Photo
   $('#photoUploadForm').on('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    $('#photoAnalysisResult').html('<em>Analyzing image...</em>');

    $.ajax({
      type: 'POST',
      url: '/api/photo-analysis',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        result = data.result.replace(/```html\s*/g, '').replace(/```/g, '');
        $('#photoAnalysisResult').html(result);
        const $img = $('#annotatableImage');
        const $container = $('#annotatedImageContainer');

        // Add click-to-annotate functionality
        $container.off('click').on('click', function (e) {
          const offset = $container.offset();
          const x = e.pageX - offset.left;
          const y = e.pageY - offset.top;

          const marker = $('<div class="annotation"></div>').css({
            left: x - 7 + 'px',  // center the dot
            top: y - 7 + 'px',
          });

          $container.append(marker);
        });
      },
      error: function () {
        $('#photoAnalysisResult').html('<div class="alert alert-danger">Error analyzing the photo.</div>');
      }
    });
  });


  // Outdoor Safety Plan
  $('#outdoorSafetyForm').on('submit', function (e) {
    e.preventDefault();

    const outdoorActivity = $('#outdoorActivity').val().trim();
    const childAge = $('#childAge').val().trim();

    if (!outdoorActivity || !childAge) return;
    $('#outdoorLoader').show();                   // Show loader
    $('#outdoorSafetyResponse').removeClass('visible').html(''); // Reset output
    $.ajax({
      url: '/api/outdoor-safety',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        outdoorActivity: $('#outdoorActivity').val().trim(),
        childAge: $('#childAge').val().trim()
      }),
      success: function (data) {
        $('#outdoorLoader').hide(); 
        $('#outdoorSafetyResponse').html(`<strong>Advice:</strong><br>${data.answer}`).addClass('visible');
      },
      error: function () {
        $('#outdoorLoader').hide(); 
        $('#outdoorSafetyResponse').html('<div class="alert alert-danger">Failed to get safety advice.</div>').addClass('visible');
      }
    });
  });

  $('#getRecommendations').click(function() {
    const query = $('#productQuery').val().trim();
    if (!query) return;

    // Show progress indicator
    $('#productLoader').show();

    // Send query to the server
    $.ajax({
      url: '/api/product-recommendations',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ query }),
      success: function(data) {
        $('#productLoader').hide();
       
          $('#productRecommendations').html(data.products);
      },
      error: function() {
        $('#productLoader').hide();
        $('#productRecommendations').html('<p>There was an error fetching recommendations. Please try again later.</p>');
      }
    });

  });

  });

