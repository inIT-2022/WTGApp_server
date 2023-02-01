package ru.gb.wtg.mapAPI.Yandex;

import ru.gb.wtg.mapAPI.MapAPIInterface;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


public class MapAPIYandex implements MapAPIInterface {

    private final String apiKey = "56a66ddf-edfc-40a0-b66e-f59f7826e136";
    private final String baseUrlForCoordinate = "https://search-maps.yandex.ru/v1/?text=%s&type=geo&lang=ru_RU&apikey=%s";

    @Override
    public List<Double> getCoordinateByAddress(String address) {
        String url = String.format(baseUrlForCoordinate,
                address.replace(" ", "_").replace("\"","").strip(),
                apiKey);

        //todo del
        System.out.println("++++URL " + url);

        HttpRequest request = null;
        HttpResponse<String> response = null;
        try {
            request = HttpRequest.newBuilder()
                    .uri(new URI(url.replace(" ", "_")))
                    .headers("Content-Type", "text/plain;charset=UTF-8")
                    .GET()
                    .build();

            response = HttpClient
                    .newBuilder()
                    .proxy(ProxySelector.getDefault())
                    .build()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            //todo del
            System.out.println(response.body().toString());

        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<Double> coordinateList = new ArrayList<>();
        Pattern p1 = Pattern.compile("(\\\"coordinates\\\")([:][\\[])([0-9.,]*)([\\]][\\}])");
        Matcher m1 = p1.matcher(response.body().toString());
            m1.find();
        String strCoordinate = m1.group();

        Pattern p2 = Pattern.compile("[0-9.]+");
        Matcher m2 = p2.matcher(strCoordinate);
            m2.find();
            coordinateList.add(Double.valueOf(m2.group()));

            m2.find();
            coordinateList.add(Double.valueOf(m2.group()));

        System.out.println(coordinateList.toString());

        return coordinateList;

//        return Arrays.stream((response.body().toString()
//                        .substring(response.body().toString().indexOf("coordinate") +14,
//                                response.body().toString().lastIndexOf("]},", response.body().toString().indexOf("coordinate") +14 + 21 )))
//                        .split(","))
//                .map( s -> {
//                    return Double.parseDouble(s);
//                }).collect(Collectors.toList());
    }

    @Override
    public List<String> getAddressByCoordinate(List<Double> coordinate) {
        return null;
    }



}
