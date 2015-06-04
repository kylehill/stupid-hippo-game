var timeouts = {}
var level = 1

var addAHippo = function() {
  var $newHippo = $("<div class='hippo'></div>")
  $(".game-container").append($newHippo)
}
var addAnOyster = function() {
  var $newOyster = $("<div class='oyster'></div>")
  $newOyster.on("mouseover", mouseoverOyster)
  $(".game-container").append($newOyster)
}

var mouseoverOyster = function() {
  $(".hippo:first").remove()
  
  if ($(".hippo").length === 0) {
    level = level + 1
    initializeLevel(level)
  }

  var containerHeight = $(".game-container").height()
  var containerWidth = $(".game-container").width()

  var leftProperty = (Math.random() * (containerWidth - 70))
  var topProperty = (Math.random() * (containerHeight- 70))

  $(".oyster").css({
    left: leftProperty + "px",
    top: topProperty + "px"
  })
}

var initializeLevel = function(level) {
  for (var i = 0; i < (level + 5); i++) {
    addAHippo()
  }

  var r = Math.round( Math.random() * 255 )
  var g = Math.round( Math.random() * 255 )
  var b = Math.round( Math.random() * 255 )

  $(".game-container").css("background-color", "rgb(" + r + "," + g + "," + b + ")")

  clearInterval(timeouts.hippoMove)

  timeouts.hippoMove = setInterval(function(){
    var containerHeight = $(".game-container").height()
    var containerWidth = $(".game-container").width()

    $(".hippo").each(function(){
      var $hippo = $(this)

      var moveAmount = 75 + (level * 25)

      var deltaTop = (Math.random() * (2 * moveAmount)) - moveAmount
      var deltaLeft = (Math.random() * (2 * moveAmount)) - moveAmount

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
}

var initializeGame = function() {
  level = 1
  initializeLevel(level)

  var startTime = new Date().valueOf()

  $(".end-message").removeClass("active")
  addAnOyster()

  timeouts.checkForCollision = setInterval(function(){
    $(".hippo:hover").each(function(){
      $(".hippo").remove()
      $(".oyster").remove()
      $(".end-message").addClass("active")

      clearInterval(timeouts.checkForCollision)
      clearInterval(timeouts.hippoMove)
      clearInterval(timeouts.hippoMultiply)

      $("#scoreText").text(level)
    })
  }, 100)

  timeouts.hippoMultiply = setInterval(addAHippo, 10000)
}

// Don't do anything until the page is finished loading everything
$(document).on("ready", function(){

  $("#restartButton").on("click", function(){
    initializeGame()
  })

  initializeGame()

})