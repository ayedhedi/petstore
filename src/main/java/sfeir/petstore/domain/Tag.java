package sfeir.petstore.domain;

/**
 * Created by ayed.h on 09/02/2016.
 */
public class Tag {
    private String key;
    private String value;

    public Tag() {
    }

    public Tag(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
