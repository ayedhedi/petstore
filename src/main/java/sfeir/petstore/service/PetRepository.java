package sfeir.petstore.service;

import org.springframework.stereotype.Service;
import sfeir.petstore.domain.Category;
import sfeir.petstore.domain.Pet;
import sfeir.petstore.domain.Status;
import sfeir.petstore.domain.Tag;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by ayed.h on 09/02/2016.
 */
@Service
public class PetRepository {

    private static final HashMap<Integer, Pet> petDatabase = new HashMap<>();
    private static final HashMap<Integer, Category> catDatabase = new HashMap<>();
    private static int cptPetId = 0;
    private static int cptCatId = 0;

    @PostConstruct
    private void init (){
         //put some data
        Category cat = new Category(cptCatId++,"cat");
        catDatabase.put(cptCatId,cat);
        Category dog = new Category(cptCatId++, "dog");
        catDatabase.put(cptCatId,dog);
        Category bird = new Category(cptCatId++, "bird");
        catDatabase.put(cptCatId,bird);

        Pet snoopy = new Pet(cptPetId++,"Snoopy",dog, Status.AVAILABLE);
        snoopy.getTags().add(new Tag("color","black"));
        snoopy.getTags().add(new Tag("race","boxer"));
        petDatabase.put(cptPetId, snoopy);

        Pet sam = new Pet(cptPetId++,"Sam",dog,Status.AVAILABLE);
        sam.getTags().add(new Tag("race","Labrador"));
        sam.getTags().add(new Tag("yearOfBirth","2010"));
        petDatabase.put(cptPetId, sam);

        Pet nina = new Pet(cptPetId++,"Nina",cat,Status.AVAILABLE);
        petDatabase.put(cptPetId, nina);
        Pet paco = new Pet(cptPetId++,"Paco",cat,Status.PENDING);
        paco.getTags().add(new Tag("race","Siamois"));
        petDatabase.put(cptPetId, paco);

        Pet twist = new Pet(cptPetId++, "Twist", bird, Status.SOLD);
        twist.getTags().add(new Tag("color", "green"));
        petDatabase.put(cptPetId, twist);
    }

    public Pet getById(int id) {
        return petDatabase.get(id);
    }

    public Category getCategory(String name) {
        for(Category cat:catDatabase.values()){
            if(cat.getName().equals(name)) {
                return cat;
            }
        }
        return new Category(cptCatId++,name);
    }

    public List<Pet> getAll() {
        return new ArrayList<>(petDatabase.values());
    }

    public List<Category> getCategories() {
        return new ArrayList<>(catDatabase.values());
    }

    public Pet save(Pet pet) {
        pet.setId(cptPetId++);
        petDatabase.put(pet.getId(), pet);
        return pet;
    }
}
