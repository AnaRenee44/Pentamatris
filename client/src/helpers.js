const axios = require('axios');


export const STAGE_WIDTH = 15;
export const STAGE_HEIGHT = 25;

export const NEXT_PIECE_HEIGHT = 5;
export const NEXT_PIECE_WIDTH = 5;

export const createStage = () => 
  Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  )

export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
  for(let y = 0; y < player.pentamino.length; y++) {
    for(let x = 0; x < player.pentamino[y].length; x++) {
      if(player.pentamino[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !=='clear'
        ) return true;
    }
  }
 }
}

// export const createNextPieceBox = () =>
//   Array.from(Array(NEXT_PIECE_HEIGHT), () =>
//     new Array(NEXT_PIECE_WIDTH).fill([0, 'clear'])
//   )

export const generateASIN = (length) => {
  var result           = 'B0';
  var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

console.log(generateASIN(8));

const options = {
  method: 'GET',
  url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
  params: {
    asin: 'B07XQXZXJC',
    page: '1',
    country: 'US',
    filter_by_star: '1',
    variants: '1',
    top: '0'
  },
  headers: {
    'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com',
    'x-rapidapi-key': process.env.X-RAPIDAPI-KEY,
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


