var timeouts = {}

var addAHippo = function() {
  var $newHippo = $("<div class='hippo'></div>")
  $(".game-container").append($newHippo)
}

var initializeGame = function() {
  for (var i = 0; i < 6; i++) {
    addAHippo()
  }

  var startTime = new Date().valueOf()

  $(".end-message").removeClass("active")

  timeouts.checkForCollision = setInterval(function(){
    $(".hippo:hover").each(function(){
      $(".hippo").remove()
      $(".end-message").addClass("active")

      clearInterval(timeouts.checkForCollision)
      clearInterval(timeouts.hippoMove)
      clearInterval(timeouts.hippoMultiply)

      var endTime = new Date().valueOf()

      $("#scoreText").text((endTime - startTime) / 1000)
    })
  }, 100)

  timeouts.hippoMove = setInterval(function(){
    var containerHeight = $(".game-container").height()
    var containerWidth = $(".game-container").width()

    $(".hippo").each(function(){
      var $hippo = $(this)

      var deltaTop = (Math.random() * 200) - 100
      var deltaLeft = (Math.random() * 200) - 100

      var currentTop = parseFloat($hippo.css("top"))
      var currentLeft = parseFloat($hippo.css("left"))

      var topProperty = (deltaTop + currentTop)
      var leftProperty = (deltaLeft + currentLeft)
      
      if (topProperty < 0) {
        topProperty = 0
      }
      if (topProperty + 70 > containerHeight) {
        topProperty = (containerHeight - 70)
      }

      if (leftProperty < 0) {
        leftProperty = 0
      }
      if (leftProperty + 70 > containerWidth) {
        leftProperty = (containerWidth - 70)
      }

      $hippo.css({
        "top": topProperty + "px",
        "left": leftProperty + "px"
      })
    })
    
  }, 500)

  timeouts.hippoMultiply = setInterval(addAHippo, 10000)
}

// Don't do anything until the page is finished loading everything
$(document).on("ready", function(){

  $("#restartButton").on("click", function(){
    initializeGame()
  })

  initializeGame()

})