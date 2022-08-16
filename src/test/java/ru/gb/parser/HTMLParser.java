package ru.gb.parser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class HTMLParser {


    public String[] getPages(String url, String filter) throws IOException {

        Document doc = Jsoup.connect(url).get();
        System.out.println("connect to: " + doc.title());
        Elements boxElements = doc.getElementsByAttributeValue("class", filter);
        Elements boxRefs = boxElements.select("a[href]");

        ArrayList<String> links = new ArrayList<String>();
        boxRefs.forEach(boxRef -> links.add(boxRef.attr("href")));
        String[] pages = new String[links.size()];

        if (links.get(0).toString().contains("http"))
            for(int i = 0;i<links.size();i++)
                pages[i] = (String) links.get(i);
        else
            for(int i = 0;i<links.size();i++)
                pages[i] = url + links.get(i);

        return pages;


    }

    public List<DataBox> getContent(String baseUrl, String[] pages, String dataFilter) throws IOException {
        Document page;
        ArrayList<DataBox> dataStore = new ArrayList<DataBox>();
        List<DataBox> result = new ArrayList<DataBox>();
        for (int i = 0; i < pages.length; i++) {

            page = Jsoup.connect(pages[i]).get();

            Elements contentElements = page.getElementsByAttributeValue("class", dataFilter);
            String html = contentElements.stream().map(Object::toString)
                    .collect(Collectors.joining(""));

            Document content = Jsoup.parse(html); //Ïîâòîðíîå ôîðìèðîâàíèå äîêóìåíòà

            int countOfElements = contentElements.size();

            ArrayList<String> parsedInfoImages = new ArrayList<String>();
            contentElements = content.getElementsByAttribute("src");
            if (contentElements.get(0).toString().contains("http")) contentElements.forEach(contentElement -> parsedInfoImages.add(contentElement.attr("src")));
            else contentElements.forEach(contentElement -> parsedInfoImages.add(baseUrl+ contentElement.attr("src")));
            ArrayList<String> parsedInfoText = new ArrayList<String>();
            contentElements = content.getElementsByClass("discript");
            contentElements.forEach(contentElement -> parsedInfoText.add(contentElement.text()));

            parsedInfoImages.forEach(image -> System.out.println(image));

            DataBox temp = new DataBox(parsedInfoImages, parsedInfoText);
            result.add(temp);




        }
        return result;
    }

    public DataBox getContent(String url, String baseUrl, String dataFilter) throws IOException {
        Document page = Jsoup.connect(url).get();

        Elements contentElements = page.getElementsByAttributeValue("class", dataFilter);
        String html = contentElements.stream().map(Object::toString)
                .collect(Collectors.joining(""));

        Document content = Jsoup.parse(html); //Ïîâòîðíîå ôîðìèðîâàíèå äîêóìåíòà

        int countOfElements = contentElements.size();

        ArrayList<String> parsedInfoImages = new ArrayList<String>();
        contentElements = content.getElementsByAttribute("src");
        if (contentElements.get(0).toString().contains("http")) contentElements.forEach(contentElement -> parsedInfoImages.add(contentElement.attr("src")));
        else contentElements.forEach(contentElement -> parsedInfoImages.add(baseUrl+ contentElement.attr("src")));
        ArrayList<String> parsedInfoText = new ArrayList<String>();
        contentElements = content.getElementsByClass("discript");
        contentElements.forEach(contentElement -> parsedInfoText.add(contentElement.text()));

        DataBox result = new DataBox(parsedInfoImages, parsedInfoText);
        return result;
    }


}
