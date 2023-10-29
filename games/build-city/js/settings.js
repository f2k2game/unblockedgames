var CANVAS_WIDTH = 1400;
var CANVAS_HEIGHT = 1920;

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;

var FONT_GAME = "upheaval_tt_brkregular";

var STATE_LOADING = 0;
var STATE_INTRO   = 1;
var STATE_MENU    = 2;
var STATE_HELP    = 3;
var STATE_GAME    = 4;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var STATE_HOOK_ROTATE = 0;
var STATE_BLOCK_ROTATE = 1;
var STATE_BLOCK_FALLING = 2;
var STATE_BLOCK_MISPLACED = 3;
var STATE_SHOW_THE_TOWER = 4;

var EDGEBOARD_X = 80;
var EDGEBOARD_Y = 160;

var BG_HEIGHT = 2185;
var FIRST_BLOCK_LANDING_Y = 1735;
var HOOK_START_X = CANVAS_WIDTH/2;
var HOOK_START_Y = EDGEBOARD_Y+ 124;
var START_HOOK_ROT_SPEED;
var HOOK_ROT_INCREASE_FACTOR;
var HOOK_THICKNESS = 4;
var HOOK_MAX_ROT; //FROM 0.1 TO 1
var LINE_LENGTH = 300;
var NUM_LEVELS;
var NUM_LIVES;
var FALL_SPEED;
var TIME_GROUND_MOVE = 800;
var Y_OFFSET_CAMERA = CANVAS_HEIGHT/2 + 300;
var BONUS_TOLLERANCE = 10;
var SPEED_TOWER_SHOWING = 15;
var MAX_SCORE_PER_BLOCK = 350;
var BEST_MULTIPLIER;
var MULTIPLIER_BONUS_POINT;
var BIRD_SPEED = 5000;
var BIRD_OCCURRENCE = 7000;

var URL_INTRO = "http://www.cloudgames.com/?utm_source=cityblocks&utm_medium=onlinegame&utm_content=splashscreen&utm_campaign=html5game";
var URL_MENU = "http://www.cloudgames.com/?utm_source=cityblocks&utm_medium=onlinegame&utm_content=logomenu&utm_campaign=html5game";
var URL_MORE_GAMES = "http://www.cloudgames.com/?utm_source=cityblocks&utm_medium=onlinegame&utm_content=moregames&utm_campaign=html5game";