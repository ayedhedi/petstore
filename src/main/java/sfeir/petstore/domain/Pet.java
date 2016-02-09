package sfeir.petstore.domain;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by ayed.h on 09/02/2016.
 */
public class Pet {
    private Integer id;
    private String name;
    private Category category;
    private Set<Tag> tags = new HashSet<>();
    private Status status;


    public Pet() {
    }

    public Pet(Integer id, String name, Category category, Status status) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
