package org.hmhb.exception.organization;

import org.hmhb.exception.NotAuthorizedException;

/**
 * An exception to indicate that a non-admin tried to update an
 * {@link org.hmhb.organization.Organization}.
 */
public class OnlyAdminCanUpdateOrgException extends NotAuthorizedException {
}
