angular
  .module('myApp', [])

  .controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.posts = [];
    $scope.options = ['', 'Twitter', 'Instagram', 'Manual'];
    var limitPost = 4;
    $scope.limit = limitPost;

    $http.get('posts.json').then(function(response){
      console.log(response);
      var apiData = response.data.items;
      apiData.forEach(function(data){
        $scope.posts.push(data)
      })
    });

    $scope.increaselimit = function() {
      $scope.limit += limitPost;
    };


  }])

  .filter('tweetFilter', function($sce){
    var url = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var atSign = /(\@[a-zA-Z_0-9]{2,100})/gim;
    var hashtag = /(\#[a-zA-Z_0-9]{2,100})/gim;

      return function(post, asTrusted) {
        var tweet = post.item_data.tweet

        if(tweet.match(url)) {
            tweet = tweet.replace(url, "<a href=\"$1\" target=\"_blank\">$1</a>");
          }

        if(tweet.match(atSign)) {
            tweet = tweet.replace(atSign, "<a href=twitter.com/\$1\ target=\"_blank\">$1</a>");
          }

          if(tweet.match(hashtag)) {
              tweet = tweet.replace(hashtag, "<a href=twitter.com/\$1\ target=\"_blank\">$1</a>");
            }

        if(asTrusted) {
          return $sce.trustAsHtml(tweet);
        }
        return tweet
      }


    })

    .filter('captionFilter', function($sce){
      var url = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
      var hashtag = /(\#[a-zA-Z_0-9]{2,100})/gim;
      var atSign = /(\@[a-zA-Z_0-9]{2,100})/gim;

      return function(post, asTrusted) {
        var caption = post.item_data.caption

        if(caption.match(url)) {
            caption = tweet.replace(url, "<a href=\"$1\" target=\"_blank\">$1</a>");
          }

        if(caption.match(hashtag)) {
            caption = caption.replace(hashtag, "<a href=instagram.com/\$1\ target=\"_blank\">$1</a>");
          }

        if(caption.match(atSign)) {
            caption = caption.replace(atSign, "<a href=instagram.com/\"$1\" target=\"_blank\">$1</a>");
          }


        if(asTrusted) {
          return $sce.trustAsHtml(caption);
        }
        return caption
      }


    });
