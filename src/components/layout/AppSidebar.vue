<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink :to="item.url" v-if="item.url.startsWith('/')">
                  <component :is="item.icon" />
                  <span>{{item.title}}</span>
                </RouterLink>
                <a v-else :href="item.url">
                  <component :is="item.icon" />
                  <span>{{item.title}}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Section Liens utiles -->
      <SidebarGroup class="mt-6">
        <SidebarGroupLabel>Liens utiles</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" class="text-sm">
                  Documentation
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" class="text-sm">
                  Aide
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" class="text-sm">
                  Support
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>