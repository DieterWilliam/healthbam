package org.hmhb.kml.jaxb;

import javax.annotation.Nonnull;
import javax.annotation.concurrent.Immutable;
import javax.xml.bind.annotation.XmlElement;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import static java.util.Objects.requireNonNull;

/**
 * An object to represent a KML Icon.
 */
@Immutable
public class KmlIcon {

    private final String href;

    /**
     * Do not use this; it was only implemented to satisfy jaxb.
     */
    public KmlIcon() {
        this.href = null;
    }

    /**
     * Constructs a {@link KmlIcon}.
     *
     * @param href the link to an image for the icon
     */
    public KmlIcon(
            @Nonnull String href
    ) {
        this.href = requireNonNull(href, "href cannot be null");
    }

    @XmlElement
    public String getHref() {
        return href;
    }

    /**
     * Do not use this; it was only implemented to satisfy jaxb.
     */
    public void setHref(String href) {
        // empty
    }

    @Override
    public boolean equals(Object o) {
        return EqualsBuilder.reflectionEquals(this, o);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
