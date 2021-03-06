package org.hmhb.program;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import java.util.List;

import org.hmhb.mapquery.MapQuery;

/**
 * Service for saving, deleting, and retrieving {@link Program}s.
 */
public interface ProgramService {

    /**
     * Retrieves a {@link Program} by its database ID.
     *
     * @param id the database ID
     * @return the {@link Program}
     */
    Program getById(@Nonnull Long id);

    /**
     * Retrieves multiple {@link Program}s by their database IDs.
     *
     * @param ids the database IDs
     * @return the {@link Program}s
     */
    List<Program> getByIds(@Nonnull List<Long> ids);

    /**
     * Retrieves all {@link Program}s in the system.
     *
     * @return all {@link Program}s
     */
    List<Program> getAll();

    /**
     * Retrieves all {@link Program}s in the system as a CSV.
     *
     * @param expandCounties whether a program's counties should not be
     *                       flattened into one row (comma delimited)
     * @param expandProgramAreas whether a program's program areas should not
     *                           be flattened into one row (comma delimited)
     * @return all {@link Program}s as CSV
     */
    String getAllAsCsv(
            @Nullable Boolean expandCounties,
            @Nullable Boolean expandProgramAreas
    );

    /**
     * Searches for {@link Program}s matching criteria in the passed in
     * {@link MapQuery}.
     *
     * @param query the search criteria
     * @return the matching {@link Program}s
     */
    List<Program> search(@Nonnull MapQuery query);

    /**
     * Deletes a {@link Program} by its database ID.
     *
     * @param id the database ID
     * @return the deleted {@link Program}
     */
    Program delete(@Nonnull Long id);

    /**
     * Saves a {@link Program} (create or update).
     *
     * @param program the {@link Program} to create or update
     * @return the saved {@link Program}
     */
    Program save(@Nonnull Program program);

}
