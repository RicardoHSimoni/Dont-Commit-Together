package com.oficina_dev.backend.models.Giver;


import com.oficina_dev.backend.models.Donation.Donation;
import com.oficina_dev.backend.models.Person.Person;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "tb_givers", schema = "public")
public class Giver {

    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "id_person", referencedColumnName = "id")
    private Person person;

    @OneToMany(mappedBy = "giver")
    private List<Donation> donations;

    public Giver(Person person) {
        this.person = person;
    }
}

