package sfeir.petstore.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sfeir.petstore.domain.Pet;
import sfeir.petstore.domain.Tag;
import sfeir.petstore.service.PetRepository;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by ayed.h on 09/02/2016.
 */
@RestController
@RequestMapping("/api/pet")
public class PetController {
    private static final Logger logger = Logger.getLogger(PetController.class.getName());

    @Autowired
    private PetRepository petRepository;

    @PostConstruct
    public void init() {
        logger.info("checking for the image uploads folder");
        File imgFolder = new File("img");
        if (!imgFolder.exists()) {
            try {
                if (imgFolder.mkdir()) {
                    logger.info("Image folder is now created !!");
                }
            }catch (Exception e){
                logger.warn("Error creating images folder: "+e.getMessage());
            }
        }else {
            logger.info("Image folder already exist");
        }
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    public @ResponseBody
    List<Pet> getAll(
            @AuthenticationPrincipal final UserDetails user) {
        logger.info("Asking for pets by "+user.getUsername());
        return petRepository.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    public @ResponseBody
    Pet getById(@AuthenticationPrincipal final UserDetails user, @PathVariable int id) {
        logger.info("Asking th pet (id= "+id+") by user "+user.getUsername());
        return petRepository.getById(id);
    }


    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public  @ResponseBody
    Pet addPet(@AuthenticationPrincipal final UserDetails user,
                      @RequestBody Pet pet,
                      HttpServletResponse response){
        /**
         * TODO:
         * Quick and Dirty check ---> should be more proper with bean validation
         */
        if (pet.getCategory() == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
        //update category with exist one
        pet.setCategory(petRepository.getCategory(pet.getCategory().getName()));
        //remove empty tags if any
        Set<Tag> validTags = new HashSet<>();
        if (pet.getTags() != null && !pet.getTags().isEmpty()) {
            pet.getTags().stream().filter(tag ->
                (tag.getKey() != null && !tag.getKey().isEmpty() && tag.getValue() != null && !tag.getValue().isEmpty())
            ).forEach(validTags::add);
            pet.setTags(validTags);
        }
        //save the new object
        return petRepository.save(pet);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deletePet(
            @PathVariable int id,
            @AuthenticationPrincipal final UserDetails user,
            HttpServletResponse response){

        if (petRepository.getById(id) == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return ;
        }

        petRepository.removePet(id);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value="/image/upload", method=RequestMethod.POST)
    public @ResponseBody String handleFileUpload(@AuthenticationPrincipal final UserDetails user,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("file") MultipartFile file){
        if (!file.isEmpty()) {
            try {
                File f = new File("img"+File.separator+name+".png");
                logger.info(f.getPath());

                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(f));
                stream.write(bytes);
                stream.close();
                return "{\"imageUrl\": \"app"+File.separator+name+".png"+"\"}";
            } catch (Exception e) {
                e.printStackTrace();
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }

}
