package ru.gb.parser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {

    public static void main(String[] args) throws IOException {
        HTMLParser parser = new HTMLParser();
        String[] pages = parser.getPages("https://tourism.krd.ru", "gallery");
        //parser.getContent("https://tourism.krd.ru", pages, "hotel");
        DataBox result = parser.getContent("https://www.culture.ru/institutes/10078/gosudarstvennaya-tretyakovskaya-galereya", "https://www.culture.ru" , "KRQ9s");
        System.out.print(result.images.get(0));
    }

}
