package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    public boolean existsByNameAndSex(String name, char sex);

}