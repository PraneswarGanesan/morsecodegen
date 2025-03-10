package com.morsecodegen.morse.controller;

import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.morsecodegen.morse.service.*;

import lombok.AllArgsConstructor;

import com.morsecodegen.morse.model.*;
@RestController
@RequestMapping("/api/morse")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class morseController {
    private final morseService morseService;
    
      @PostMapping("/encode")
    public ResponseEntity< morseCode> encode(@RequestBody  morseCode request) {
        String encodedMessage = morseService.enocode(request.getMessage());
        morseCode response = new  morseCode();
        response.setEncoded(encodedMessage);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/decode")
    public ResponseEntity< morseCode> decode(@RequestBody  morseCode request) {
        String decodedMessage = morseService.decode(request.getMessage());
        morseCode response = new morseCode();
        response.setDecoded(decodedMessage);
        return ResponseEntity.ok(response);
    }
}
