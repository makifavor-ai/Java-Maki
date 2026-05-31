const hands = ['rock', 'scissors', 'paper'];
const emoji = { rock: '✊', scissors: '✌️', paper: '🖐️' };
const label = { rock: 'グー', scissors: 'チョキ', paper: 'パー' };
let scoreYou = 0, scoreCpu = 0;

$('.hand-btn').on('click', function () {
  const you = $(this).data('hand');
  const cpu = hands[Math.floor(Math.random() * 3)];

  // 音声
  speak('じゃんけん');
  setTimeout(() => speak('ぽん'), 700);

  // 表示更新
  $('#you-face').text('👦');
  $('#you-hand').text(emoji[you]);
  $('#cpu-face').text(emoji[cpu]);
  $('#cpu-hand').text('');
  $('#you-label').text(label[you]);
  $('#cpu-label').text(label[cpu]);

  // 判定
  const result = judge(you, cpu);
  if (result === 'win') {
    scoreYou++;
    $('#score-you').text(scoreYou);
    $('#result-text').text('🎉 かった！').css('color', '#e07800');
    $('#cpu-face').text('🙀');
    $('#cpu-hand').text(emoji[cpu]);
  } else if (result === 'lose') {
    scoreCpu++;
    $('#score-cpu').text(scoreCpu);
    $('#result-text').text('😢 まけた…').css('color', '#e91e63');
    $('#cpu-face').text('😼');
    $('#cpu-hand').text(emoji[cpu]);
  } else {
    $('#result-text').text('🤝 あいこ！').css('color', '#388e3c');
    $('#cpu-face').text('😸');
    $('#cpu-hand').text(emoji[cpu]);
  }
});

$('#reset-btn').on('click', function () {
  scoreYou = 0; scoreCpu = 0;
  $('#score-you, #score-cpu').text(0);
  $('#you-face').text('👦');
  $('#you-hand').text('❓');
  $('#cpu-face').text('😺');
  $('#cpu-hand').text('❓');
  $('#you-label, #cpu-label').text('');
  $('#result-text').text('').css('color', '');
});

function judge(you, cpu) {
  if (you === cpu) return 'draw';
  if (
    (you === 'rock'     && cpu === 'scissors') ||
    (you === 'scissors' && cpu === 'paper')    ||
    (you === 'paper'    && cpu === 'rock')
  ) return 'win';
  return 'lose';
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ja-JP';
  utt.pitch = 1.3;
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}