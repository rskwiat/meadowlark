//fortune cookie

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "River needs Springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surpise.",
    "Whenever possible keep is simple.",
    "4 8 15 16 23 42"
];

exports.getFortune = function(){
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};
