export type OrganizationId = string;
export type OrganizationMemberId = string;

export type OrganizationRole = "admin" | "member";

export interface Organization {
	id: OrganizationId;
	name: string;
	slug: string;
	description?: string;
	ownerId: string;
	createdAt: string;
	updatedAt: string;
}

export interface OrganizationMember {
	id: OrganizationMemberId;
	organizationId: OrganizationId;
	userId: string;
	role: OrganizationRole;
	joinedAt: string;
}

export interface CreateOrganizationInput {
	name: string;
	slug?: string;
	description?: string;
}

export interface UpdateOrganizationInput {
	name?: string;
	slug?: string;
	description?: string;
}

export interface AddOrganizationMemberInput {
	userId: string;
	role?: OrganizationRole;
}
