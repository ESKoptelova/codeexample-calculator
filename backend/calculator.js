var calculator = new Object();


calculator.calculate = function(text){
    
    text = text.replace(/\s+/g, "");
    
    var numbers = [];
    var actions = [];
    if (!initializeArrays(text, numbers, actions)){
        return "Incorrect input!";
    }
        
    calculateBracketsRecursively(actions, numbers, 0);
    
    calculateFirstOrderOperations(actions, numbers);
    calculateSecondOrderOperations(actions, numbers);
    calculateThirdOrderOperations(actions, numbers);
    
    if (numbers.length > 0)
        return numbers[0]; 
}

function initializeArrays(text, numbers, actions){
    var open_brackets = 0;
    var close_brackets = 0;
    for(var i = 0; i < text.length; i++){

        var char_i = text.charAt(i);
        switch (true){
            
            case (char_i >= "0" && char_i <= "9"): {
                num = GetNumber(text, i);
                numbers.push(parseFloat(num));
                i += num.length - 1;
                break;
            }

            case (char_i == "*" || char_i == "/" ||
                  char_i == "+"): {
                      actions.push(char_i);
                      break;
            }
                                                        
            case (char_i == "(" || char_i == ")"):{
                if(char_i == "("){
                    open_brackets += 1;
                } else {
                    close_brackets += 1;
                }
                
                if (close_brackets > open_brackets){
                    return false;
                }
                actions.push(char_i);
                numbers.push(char_i);
                break;
            }

            case (char_i == "-"):{ 
                if ( i == 0 || 
                     text.charAt(i-1) == "*" || 
                     text.charAt(i-1) == "/" || 
                     text.charAt(i-1) == "(") {
                    numbers.push(-1);
                    actions.push("*");
                } else {
                    actions.push(char_i);
                }
                break;
            }					 
                                                                    
            default: return false;
        }
    }            
                
    if (close_brackets != open_brackets ||
        actions.length != (numbers.length - 1)){
        return false;
    }

    return true;
}
                
function calculateBracketsRecursively(actions, numbers, starting_position){
    for (var i = starting_position; i < actions.length; i++){
        var action = actions[i];
        if (action == "("){
            var closing_bracket_position = calculateBracketsRecursively(actions, numbers, i + 1);					
            
            var inner_actions = actions.slice();
            inner_actions.splice(closing_bracket_position, inner_actions.length - closing_bracket_position);
            inner_actions.splice(0, i + 1);
            var inner_numbers = numbers.slice();
            inner_numbers.splice(closing_bracket_position + 1, inner_numbers.length - closing_bracket_position);
            inner_numbers.splice(0, i + 1);
        
            calculateFirstOrderOperations(inner_actions, inner_numbers);
            calculateSecondOrderOperations(inner_actions, inner_numbers);
            calculateThirdOrderOperations(inner_actions, inner_numbers);
            
            actions.splice(i, closing_bracket_position - i + 1);
            numbers.splice(i, closing_bracket_position - i + 2);
            numbers.splice(i, 0, inner_numbers[0]);
            i -= 1;
        } 
        
        if (action == ")"){
            return i;
        }
    }
}


function  calculateFirstOrderOperations(actions, numbers){
    for (var i = 0; i < numbers.length; i++){
        var number = numbers[i];
        var action = actions[i];
        if (number == -1 && 
            numbers.length > 1 && 
            action == "*" ){
            var res;
            var second_num = numbers[i + 1]
            res = second_num * -1;
            
            numbers[i] = res;
            numbers.splice(i + 1, 1);
            actions.splice(i, 1);
        }
    }
    return;
}



function calculateSecondOrderOperations(actions, numbers){
    for (var i = 0; i < actions.length; i++){
        var action = actions[i];
        if (action == "*" || action == "/"){
            var res;
            var first_num = numbers[i]; 
            var second_num = numbers[i + 1]
            
            if (action == "*"){
                res = first_num * second_num;
            } else {
                res = first_num / second_num;
            }
            
            numbers[i] = res;
            numbers.splice(i + 1, 1);
            actions.splice(i, 1);
            i -= 1;
        }
    }
    return;
}

function calculateThirdOrderOperations(actions, numbers){
    for (var i = 0; i < actions.length; i++){
        var action = actions[i];
        if (action == "+" || action == "-"){
            var res;
            var first_num = numbers[i]; 
            var second_num = numbers[i + 1]
            
            if (action == "+"){
                res = first_num + second_num;
            } else {
                res = first_num - second_num;
            }
            
            numbers[i] = res;
            numbers.splice(i + 1, 1);
            actions.splice(i, 1);
            i -= 1;
        }
    }
    return;
}


function GetNumber(number_as_text, position){
    var res = "";
    
    for(var j = position; j < number_as_text.length; j++){
        var ch = number_as_text.charAt(j);
        switch (true){
            case (ch >= "0" && ch <= "9"): res += ch;
                    break;
            case (ch == "." || ch == ","): res += ".";
                    break;
            default: return res;
        }
    }
    return res;
}
    
 
module.exports  = calculator;