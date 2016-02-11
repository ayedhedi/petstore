package sfeir.petstore.service;

import org.springframework.security.access.prepost.PreAuthorize;
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
    private static final HashMap<Integer, Pet> removedPetDatabase = new HashMap<>();
    private static int cptPetId = 1;
    private static int cptCatId = 1;

    @PostConstruct
    private void init (){
         //put some data
        Category cat = new Category(cptCatId,"cat");
        catDatabase.put(cptCatId,cat);
        cptCatId++;
        Category dog = new Category(cptCatId, "dog");
        catDatabase.put(cptCatId,dog);
        cptCatId++;
        Category bird = new Category(cptCatId, "bird");
        catDatabase.put(cptCatId,bird);
        cptCatId++;

        Pet snoopy = new Pet(cptPetId,"Snoopy",dog, Status.AVAILABLE);
        snoopy.getTags().add(new Tag("color","black"));
        snoopy.getTags().add(new Tag("race","boxer"));
        petDatabase.put(cptPetId, snoopy);
        cptPetId++;

        Pet sam = new Pet(cptPetId,"Sam",dog,Status.AVAILABLE);
        sam.getTags().add(new Tag("race","Labrador"));
        sam.getTags().add(new Tag("yearOfBirth","2010"));
        petDatabase.put(cptPetId, sam);
        cptPetId++;

        Pet nina = new Pet(cptPetId,"Nina",cat,Status.AVAILABLE);
        petDatabase.put(cptPetId, nina);
        cptPetId++;
        Pet paco = new Pet(cptPetId,"Paco",cat,Status.PENDING);
        paco.getTags().add(new Tag("race","Siamois"));
        petDatabase.put(cptPetId, paco);
        cptPetId++;

        Pet twist = new Pet(cptPetId, "Twist", bird, Status.SOLD);
        twist.getTags().add(new Tag("color", "green"));
        petDatabase.put(cptPetId, twist);
        cptPetId++;
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
        Category cat =  new Category(cptCatId++,name);
        catDatabase.put(cat.getId(),cat);
        return cat;
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

    public void removePet(int id) {
        Pet pet = petDatabase.remove(id);
        if (pet != null) {
            removedPetDatabase.put(pet.getId(),pet);
        }
    }
}
