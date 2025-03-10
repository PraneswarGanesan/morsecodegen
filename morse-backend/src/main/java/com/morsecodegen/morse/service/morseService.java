package com.morsecodegen.morse.service;
import java.util.*;
import org.springframework.stereotype.Service;

import com.morsecodegen.morse.model.morseCode;

@Service
public class morseService {
    private static final Map<Character, String> morseMap = new HashMap<>();
    private static final Map<String, Character> reverseMorseMap = new HashMap<>();

    static {
        String[] morseLetters = {
                ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---",
                "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-",
                "..-", "...-", ".--", "-..-", "-.--", "--..",
                "-----", ".----", "..---", "...--", "....-", ".....",
                "-....", "--...", "---..", "----."
        };
        char[] characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

        for (int i = 0; i < characters.length; i++) {
            morseMap.put(characters[i], morseLetters[i]);
            reverseMorseMap.put(morseLetters[i], characters[i]);
        }
    }

    public String enocode(String message){
        StringBuilder encoded = new StringBuilder();
        for(char c : message.toUpperCase().toCharArray()){
           if(morseMap.containsKey(c)){
               encoded.append(morseMap.get(c));
               encoded.append(" ");
           }
           if(c == ' '){
            encoded.append(" ");
           }
        }
        return encoded.toString();
    }
    public String decode(String moCode) {
        StringBuilder decoded = new StringBuilder();
        String[] words = moCode.trim().split(" {3}"); 
    
        for (String word : words) {
            for (String letter : word.split(" ")) { 
                decoded.append(reverseMorseMap.getOrDefault(letter, ' '));
            }
            decoded.append(" "); 
        }
    
        return decoded.toString().trim(); 
    }
    
}
