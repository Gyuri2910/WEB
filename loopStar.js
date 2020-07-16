let i;
let j;
let string = '';
for(i=0; i<5; i++) {
  for(j=5-i; j>0; j--) {
    string += '*';
  }
  string += '\n';
}
console.log(string);

string = '';
for(i=5; i>0; i--) {
  for(j=0; j<=5; j++) {
    if(i>j)
    string += ' ';
    else
    string += '*';
  }
  string += '\n';
}
console.log(string);