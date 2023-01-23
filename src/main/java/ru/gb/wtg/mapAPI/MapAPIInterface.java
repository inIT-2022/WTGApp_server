package ru.gb.wtg.mapAPI;

import java.util.List;

public interface MapAPIInterface {

    List<Double> getCoordinateByAddress(String address);
    List<String> getAddressByCoordinate(List<Double> coordinate);

}
