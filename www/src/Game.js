/* globals Phaser:false */
// create BasicGame Class
BasicGame = {

};

// create Game function in BasicGame
BasicGame.Game = function (game) {
};
var map;
var layer,
    collision_layer;

var sprite;
var cursors;
// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        //this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape.
        // * Set second to true to force portrait.
        //this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        //this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        //this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        //this.scale.refresh();

    },

    preload: function () {
      this.load.tilemap('map', 'asset/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.image('tileset', 'asset/tilemaps/tileset.png',32,32);
      this.load.image('phaser', 'asset/sprites/arrow.png');
      this.load.spritesheet('coin', 'asset/sprites/coin.png', 32, 32);
    },

    create: function () {
        // Add logo to the center of the stage
        this.physics.startSystem(Phaser.Physics.P2JS);

        map = this.add.tilemap('map');

        map.addTilesetImage("tileset");
        //map.addTilesetImage('coin');

        map.setCollision(1);
        map.setCollision(785);
        console.log(map)
        //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
        //map.setTileIndexCallback(785, this.hitCoin, this);

        //  This will set the map location 2, 0 to call the function
        //map.setTileLocationCallback(2, 0, 1, 1, this.hitCoin, this);

        // game.device.canvasBitBltShift = false;

        layer = map.createLayer("\u0421\u043b\u043e\u0439 \u0442\u0430\u0439\u043b\u043e\u0432 1");
        collision_layer = map.createLayer("\u0421\u043b\u043e\u0439 \u0442\u0430\u0439\u043b\u043e\u0432 2");
        layer.resizeWorld();

        this.physics.p2.convertTilemap(map, collision_layer);

        sprite = this.add.sprite(260, 100, 'phaser');
        sprite.anchor.set(0.5);
        this.physics.p2.enable(sprite);

        //sprite.body.setSize(32, 32, 8, 8);

        //  We'll set a lower max angular velocity here to keep it from going totally nuts
        sprite.body.maxAngular = 500;

        //  Apply a drag otherwise the sprite will just spin and never slow down
        sprite.body.angularDrag = 50;
        sprite.body.collideWorldBounds = true
        this.camera.follow(sprite);

        cursors = this.input.keyboard.createCursorKeys();

    },
    hitCoin: function (sprite, tile) {
      console.log('coin')
        tile.alpha = 0.2;

        layer.dirty = false;

        return false;

    },

    update: function() {

        //this.physics.arcade.collide(sprite, layer);
        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
        sprite.body.angularVelocity = 0;

        if (cursors.left.isDown)
    {
    	sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
    	sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
    	sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.moveDown(400);
    }

    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the
        // game resizes. A resize could happen if for example swapping
        // orientation on a device or resizing the browser window. Note that
        // this callback is only really useful if you use a ScaleMode of RESIZE
        // and place it inside your main game state.

    },

     render: function() {
        this.add.sprite(sprite);

    }

};
