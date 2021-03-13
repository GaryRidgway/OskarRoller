function hunters_mark() {
  return document.getElementById('hunters_mark').checked;
}

function favored_foe() {
  return document.getElementById('favored_foe').checked;
}

function hexblades_curse() {
  return document.getElementById('hexblades_curse').checked;
}

function die(die) {
  return Math.floor(Math.random() * die) + 1;
}

function roll_attack() {
  let roll = die(20);
  let old_output = document.getElementById('attack_output').innerHTML;
  let crit = '';
  let crit_text = '';
  let is_crit = false;
  if (roll == 20 || (hexblades_curse() && roll ==19)) {
    crit = 'crit';
    crit_text = ' -- Critical!!';
    is_crit = true;
  }
  let mod_roll = roll + 5 + 4 + 2;
  let new_output = '<div class="roll-container ' + crit + '">\
  <div class="attack">[ ' + mod_roll + ' ] To hit' + crit_text + '</div>\
  <div class="damage">' + roll_damage(is_crit) +'</div>\
  </div>' + old_output;

  document.getElementById('attack_output').innerHTML = new_output;
}

function roll_damage(is_crit) {

  let output  = '';
  let d_force = die(10);
  let d_psy   = die(4);
  let d_curse = (hexblades_curse()) ? 4 : 0;
  let d_mark  = (hunters_mark()) ? die(6) : 0;
  let d_foe   = (favored_foe()) ? die(6) : 0;
  let mod     = 5;

  if (is_crit) {
    output += '<div>[ ' + (d_force + 10 + mod + d_mark + 6 + d_curse) +' ] Force damage</div>';
    output += '<div>[ ' + (d_psy + 4) + ' ] Psychic damage</div>';
    output += '<div>[ ' + (d_force + 10 + mod + d_mark + 6 + d_curse + d_psy + 4) + ' ] Total damage</div>';
  }
  else {
    output += '<div>[ ' + (d_force + mod + d_mark + d_curse) +' ] Force damage</div>';
    output += '<div>[ ' + (d_psy) + ' ] Psychic damage</div>';
    output += '<div>[ ' + (d_force + mod + d_mark + d_curse + d_psy) + ' ] Total damage</div>';
  }

  return output;
}
